import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager


class FastPrepScraper:
    def __init__(self, headless: bool = False):  # Keep headless=False for OTP entry
        options = Options()
        if headless:
            options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")

        print("Launching browser...")
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        self.wait = WebDriverWait(self.driver, 120)

    def login(self, email: str):
        try:
            print("Navigating to login page...")
            self.driver.get("https://www.fastprep.io/login")
            time.sleep(3)

            self.driver.save_screenshot("login_page.png")

            email_input = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'input[type="email"]')))
            email_input.send_keys(email)

            self.driver.find_element(By.CSS_SELECTOR, "button[type=submit]").click()

            print("Please enter the OTP manually in the browser window...")
            for i in range(60):
                time.sleep(1)
                if "/dashboard" in self.driver.current_url:
                    break
            else:
                raise Exception("Login timeout or OTP not submitted. See login_page.png")

            print(" Login successful!")

            # Optionally save cookies
            with open("cookies.json", "w") as f:
                json.dump(self.driver.get_cookies(), f)

        except Exception as e:
            print(f" Login failed: {e}")
            self.driver.save_screenshot("login_error.png")
            raise

    def scrape_problems(self):
        url = "https://www.fastprep.io/dashboard/problems"
        print(f"Navigating to: {url}")
        self.driver.get(url)

        try:
            self.wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".problem-card")))
        except TimeoutException:
            print(" Timeout: Problem cards not found.")
            self.driver.save_screenshot("problem_load_error.png")
            return []

        cards = self.driver.find_elements(By.CSS_SELECTOR, ".problem-card")
        print(f" Found {len(cards)} problems")

        problems = []
        for idx, card in enumerate(cards, start=1):
            try:
                title = card.find_element(By.CSS_SELECTOR, ".problem-title").text.strip()
                difficulty = card.find_element(By.CSS_SELECTOR, ".problem-difficulty").text.strip()
                tags = [tag.text.strip() for tag in card.find_elements(By.CSS_SELECTOR, ".problem-tag")]

                problems.append({
                    "title": title,
                    "difficulty": difficulty,
                    "tags": tags
                })
            except NoSuchElementException:
                print(f" Problem {idx} skipped: missing fields")

        return problems

    def close(self):
        print("Closing browser...")
        self.driver.quit()


if __name__ == "__main__":
    EMAIL = "43srishtimishra@gmail.com"

    scraper = FastPrepScraper(headless=False) 

    try:
        scraper.login(EMAIL)
        problems = scraper.scrape_problems()

        print("\n Scraped Problems:")
        print(json.dumps(problems, indent=2, ensure_ascii=False))

        with open("fastprep_problems.json", "w", encoding="utf-8") as f:
            json.dump(problems, f, indent=2, ensure_ascii=False)
        print("Saved to fastprep_problems.json")

    finally:
        scraper.close()

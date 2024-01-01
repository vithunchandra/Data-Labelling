package datle;

import java.io.IOException;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class Testing {
	WebDriver driver;
	Worker worker;
	Admin admin;
	
	@BeforeTest
	public void setup() {
		System.setProperty("webdriver.chrome.driver", "./driver/chromedriver.exe");
		driver = new ChromeDriver();
		worker = new Worker(driver);
		admin = new Admin(driver);
	}
	
	@Test(priority=1)
	public void testing() throws InterruptedException, IOException {
		worker.signin();
	}
	
	@Test(priority=2)
	public void dashboard_worker() throws InterruptedException, IOException {
		worker.dashboard();
	}
	
	@AfterTest
	public void close() {
		driver.close();
	}
}

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
	
	@BeforeTest
	public void setup() {
		System.setProperty("webdriver.chrome.driver", "./driver/chromedriver.exe");
		driver = new ChromeDriver();
		worker = new Worker(driver);
		admin = new Admin(driver);
	}
	
	@Test
	public void testing() throws InterruptedException, IOException {
//		worker.register();
		worker.signin();
		worker.dashboard();
		worker.marketplace();
		worker.task();
		worker.wallet();

		admin.signin();
		admin.dashboard();
		admin.admin_task_type();
		admin.task();
		admin.user();
	}
	
	@AfterTest
	public void close() {
		driver.close();
	}
}

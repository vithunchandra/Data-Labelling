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
	public void worker_dashboard_last_chat_navigation() throws InterruptedException, IOException {
		worker.dashboard_last_chat_navigation();
	}
	
	@Test(priority=3)
	public void worker_dashboard_last_task_navigation() throws InterruptedException, IOException {
		worker.dashboard_last_task_navigation();
	}
	
	@Test(priority=4)
	public void marketplace() throws InterruptedException, IOException {
		worker.marketplace();
	}
	
	@Test(priority=5)
	public void marketplace_pagination() throws InterruptedException, IOException {
		worker.marketplace_pagination();
	}
	
	@Test(priority=6)
	public void marketplace_filter() throws InterruptedException, IOException {
		worker.marketplace_filter();
	}
	
	@Test(priority=7)
	public void marketplace_task_detail() throws InterruptedException, IOException {
		worker.marketplace_task_detail();
	}
	
	@Test(priority=8)
	public void worker_task() throws InterruptedException, IOException {
		worker.task();
	}
	
	@Test(priority=9)
	public void worker_task_pagination() throws InterruptedException, IOException {
		worker.task_pagination();
	}
	
	@Test(priority=10)
	public void worker_task_filter() throws InterruptedException, IOException {
		worker.task_filter();
	}
	
	@Test(priority=11)
	public void worker_task_detail() throws InterruptedException, IOException {
		worker.task_detail();
	}
	
	@Test(priority=12)
	public void worker_see_chat() throws InterruptedException, IOException {
		worker.see_chat();
	}
	
	@Test(priority=13)
	public void worker_chat() throws InterruptedException, IOException {
		worker.chat();
	}
	
	@Test(priority=14)
	public void worker_task_data() throws InterruptedException, IOException {
		worker.task_data();
	}
	
	@Test(priority=15)
	public void worker_data_pagination() throws InterruptedException, IOException {
		worker.data_pagination();
	}
	
	@Test(priority=16)
	public void worker_data_filter() throws InterruptedException, IOException {
		worker.data_filter();
	}
	
	@Test(priority=17)
	public void worker_data_information() throws InterruptedException, IOException {
		worker.data_information();
	}
	
	@Test(priority=18)
	public void labeling() throws InterruptedException, IOException {
		worker.labeling();
	}
	
	@Test(priority=19)
	public void wallet_worker() throws InterruptedException, IOException {
		worker.wallet();
	}
	
	@Test(priority=20)
	public void logout_worker() throws InterruptedException {
		worker.logout();
	}
	
	@AfterTest
	public void close() {
		driver.close();
	}
}

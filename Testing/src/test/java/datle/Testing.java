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
	
	@Test(priority = 1)
	public void admin_login() throws InterruptedException, IOException {
		admin.signin();
	}
	
<<<<<<< HEAD
	@Test(priority = 2)
	public void admin_dashboard_to_user() throws InterruptedException, IOException {
		admin.dashboard_to_user();
=======
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
	public void worker_chat() throws InterruptedException, IOException {
		worker.chat();
	}
	
	@Test(priority=13)
	public void worker_task_data() throws InterruptedException, IOException {
		worker.task_data();
	}
	
	@Test(priority=14)
	public void worker_data_pagination() throws InterruptedException, IOException {
		worker.data_pagination();
	}
	
	@Test(priority=15)
	public void worker_data_filter() throws InterruptedException, IOException {
		worker.data_filter();
	}
	
	@Test(priority=16)
	public void worker_data_information() throws InterruptedException, IOException {
		worker.data_information();
	}
	
	@Test(priority=17)
	public void labeling() throws InterruptedException, IOException {
		worker.labeling();
	}
	
	@Test(priority=18)
	public void wallet_worker() throws InterruptedException, IOException {
		worker.wallet();
>>>>>>> 5aeb3b353d03f902f4d2bb2612faf0965731830a
	}
	
	@Test(priority = 3)
	public void admin_dashboard_to_task() throws InterruptedException, IOException {
		admin.dashboard_to_task();
	}
	
	@Test(priority = 4)
	public void admin_dashboard_to_task_type() throws InterruptedException, IOException {
		admin.dashboard_to_task_type();
	}
	
	@Test(priority = 5)
	public void admin_edit_task_type() throws InterruptedException, IOException {
		admin.edit_task_type();
	}
	
	@Test(priority = 6)
	public void admin_add_task_type() throws InterruptedException, IOException {
		admin.add_task_type();
	}
	
	@Test(priority = 7)
	public void admin_task_filter() throws InterruptedException, IOException {
		admin.task_filter();
	}
	
	@Test(priority = 8)
	public void admin_task_to_detail() throws InterruptedException, IOException {
		admin.task_to_detail();
	}
	
	@Test(priority = 9)
	public void admin_task_detail_data() throws InterruptedException, IOException {
		admin.task_detail_data();
	}
	
	@Test(priority = 10)
	public void admin_task_button_back() throws InterruptedException, IOException {
		admin.task_button_back();
	}
	
	@Test(priority = 11)
	public void admin_user_filter() throws InterruptedException, IOException {
		admin.user_filter();
	}
	
	@Test(priority = 12)
	public void admin_user_detail() throws InterruptedException, IOException {
		admin.user_detail();
	}
	
	@Test(priority = 13)
	public void admin_user_task_detail() throws InterruptedException, IOException {
		admin.user_task_detail();
	}
	
	@Test(priority = 14)
	public void admin_user_task_detail_data() throws InterruptedException, IOException {
		admin.user_task_detail_data();
	}
	
	@Test(priority = 15)
	public void admin_user_button_back() throws InterruptedException, IOException {
		admin.user_button_back();
	}
	
	@Test(priority = 16)
	public void admin_signout() throws InterruptedException, IOException {
		admin.signout();
	}
		
	@AfterTest
	public void close() {
		driver.close();
	}
}

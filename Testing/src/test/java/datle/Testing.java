//package datle;
//
//import java.io.IOException;
//
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.testng.annotations.AfterTest;
//import org.testng.annotations.BeforeTest;
//import org.testng.annotations.Test;
//
//public class Testing {
//	WebDriver driver;
//	Worker worker;
//	Admin admin;
//	Requester requester;
//	
//	@BeforeTest
//	public void setup() {
//		System.setProperty("webdriver.chrome.driver", "./driver/chromedriver.exe");
//		driver = new ChromeDriver();
//		worker = new Worker(driver);
//		admin = new Admin(driver);
//		requester = new Requester(driver);
//        driver.manage().window().maximize();
//	}
//	
//	@Test(priority = 1)
//	public void requesterRegister() throws InterruptedException, IOException {
//		requester.checkRegister();
//	}
//	
//	@Test(priority = 2)
//	public void requesterLogin() throws InterruptedException, IOException {
//		requester.checkLogin();
//	}
//	
//	@Test(priority = 3)
//	public void requesterNavigateAddTask() throws InterruptedException, IOException {
//		requester.checkNavigateAddTask();
//	}
//	
//	@Test(priority = 4)
//	public void requesterCheckNavigateOtherNavbar() throws InterruptedException, IOException {
//		requester.checkNavigateOtherNavbar();
//	}
//	
//	@Test(priority = 5)
//	public void requesterCheckCreateTask() throws InterruptedException, IOException {
//		requester.checkCreateTask();
//	}
//	
//	@Test(priority = 6)
//	public void requesterTopUp() throws InterruptedException, IOException {
//		requester.topUp();
//	}
//	
//	@Test(priority = 7)
//	public void requesterCheckCreateTaskSummary() throws InterruptedException, IOException {
//		requester.checkCreateTaskSummary();
//	}
//	
//	@Test(priority = 8)
//	public void requesterCheckCloseAllTask() throws InterruptedException, IOException {
//		requester.closeAllTaskCheck();
//	}
//	
//	@Test(priority = 9)
//	public void requesterCheckOpenAllTask() throws InterruptedException, IOException {
//		requester.openAllTaskCheck();
//	}
//	
//	@Test(priority = 10)
//	public void requesterCheckEditTask() throws InterruptedException, IOException {
//		requester.editTask();
//	}
//	
//	@Test(priority=25)
//	public void testing() throws InterruptedException, IOException {
//		worker.signin();
//	}
//	
//	@Test(priority=26)
//	public void worker_dashboard_last_chat_navigation() throws InterruptedException, IOException {
//		worker.dashboard_last_chat_navigation();
//	}
//	
//	@Test(priority=27)
//	public void worker_dashboard_last_task_navigation() throws InterruptedException, IOException {
//		worker.dashboard_last_task_navigation();
//	}
//	
//	@Test(priority=28)
//	public void marketplace() throws InterruptedException, IOException {
//		worker.marketplace();
//	}
//	
//	@Test(priority=29)
//	public void marketplace_pagination() throws InterruptedException, IOException {
//		worker.marketplace_pagination();
//	}
//	
//	@Test(priority=30)
//	public void marketplace_filter() throws InterruptedException, IOException {
//		worker.marketplace_filter();
//	}
//	
//	@Test(priority=31)
//	public void marketplace_task_detail() throws InterruptedException, IOException {
//		worker.marketplace_task_detail();
//	}
//	
//	@Test(priority=32)
//	public void worker_task() throws InterruptedException, IOException {
//		worker.task();
//	}
//	
//	@Test(priority=33)
//	public void worker_task_pagination() throws InterruptedException, IOException {
//		worker.task_pagination();
//	}
//	
//	@Test(priority=34)
//	public void worker_task_filter() throws InterruptedException, IOException {
//		worker.task_filter();
//	}
//	
//	@Test(priority=35)
//	public void worker_task_detail() throws InterruptedException, IOException {
//		worker.task_detail();
//	}
//	
//	@Test(priority=36)
//	public void worker_see_chat() throws InterruptedException, IOException {
//		worker.see_chat();
//	}
//	
//	@Test(priority=37)
//	public void worker_chat() throws InterruptedException, IOException {
//		worker.chat();
//	}
//	
//	@Test(priority=38)
//	public void worker_task_data() throws InterruptedException, IOException {
//		worker.task_data();
//	}
//	
//	@Test(priority=39)
//	public void worker_data_pagination() throws InterruptedException, IOException {
//		worker.data_pagination();
//	}
//	
//	@Test(priority=40)
//	public void worker_data_filter() throws InterruptedException, IOException {
//		worker.data_filter();
//	}
//	
//	@Test(priority=41)
//	public void worker_data_information() throws InterruptedException, IOException {
//		worker.data_information();
//	}
//	
//	@Test(priority=42)
//	public void labeling() throws InterruptedException, IOException {
//		worker.labeling();
//	}
//	
//	@Test(priority=43)
//	public void wallet_worker() throws InterruptedException, IOException {
//		worker.wallet();
//	}
//	
//	@Test(priority=44)
//	public void logout_worker() throws InterruptedException {
//		worker.logout();
//	}
//	
//	@Test(priority = 45)
//	public void admin_login() throws InterruptedException, IOException {
//		admin.signin();
//	}
//	
//	@Test(priority = 46)
//	public void admin_dashboard_to_user() throws InterruptedException, IOException {
//		admin.dashboard_to_user();
//	}
//	
//	@Test(priority = 47)
//	public void admin_dashboard_to_task() throws InterruptedException, IOException {
//		admin.dashboard_to_task();
//	}
//	
//	@Test(priority = 48)
//	public void admin_dashboard_to_task_type() throws InterruptedException, IOException {
//		admin.dashboard_to_task_type();
//	}
//	
//	@Test(priority = 49)
//	public void admin_edit_task_type() throws InterruptedException, IOException {
//		admin.edit_task_type();
//	}
//	
//	@Test(priority = 50)
//	public void admin_add_task_type() throws InterruptedException, IOException {
//		admin.add_task_type();
//	}
//	
//	@Test(priority = 51)
//	public void admin_task_filter() throws InterruptedException, IOException {
//		admin.task_filter();
//	}
//	
//	@Test(priority = 52)
//	public void admin_task_to_detail() throws InterruptedException, IOException {
//		admin.task_to_detail();
//	}
//	
//	@Test(priority = 53)
//	public void admin_task_detail_data() throws InterruptedException, IOException {
//		admin.task_detail_data();
//	}
//	
//	@Test(priority = 54)
//	public void admin_task_button_back() throws InterruptedException, IOException {
//		admin.task_button_back();
//	}
//	
//	@Test(priority = 55)
//	public void admin_user_filter() throws InterruptedException, IOException {
//		admin.user_filter();
//	}
//	
//	@Test(priority = 56)
//	public void admin_user_detail() throws InterruptedException, IOException {
//		admin.user_detail();
//	}
//	
//	@Test(priority = 57)
//	public void admin_user_task_detail() throws InterruptedException, IOException {
//		admin.user_task_detail();
//	}
//	
//	@Test(priority = 58)
//	public void admin_user_task_detail_data() throws InterruptedException, IOException {
//		admin.user_task_detail_data();
//	}
//	
//	@Test(priority = 59)
//	public void admin_user_button_back() throws InterruptedException, IOException {
//		admin.user_button_back();
//	}
//	
//	@Test(priority = 60)
//	public void admin_signout() throws InterruptedException, IOException {
//		admin.signout();
//	}
//	
//	@AfterTest
//	public void close() {
//		driver.close();
//	}
//}

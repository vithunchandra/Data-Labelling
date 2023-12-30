
8package datle;

import java.io.File;
import java.io.IOException;
import java.time.Duration;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class Admin{
    WebDriver driver

    Admin (WebDriver driver){
        this.driver = driver;;l; 
    }

    public void signin() throws InterruptedException, IOException {
        // login as admin
		driver.get("https://datle-frontend.vercel.app");
        driver.findElement(By.id(":r0:")).sendKeys("admin@gmail.com");
        driver.findElement(By.id(":r1:")).sendKeys("admin");
        screenshot("./screenshot/login_admin.png");
        driver.findElement(By.cssSelector("button.MuiButton-containedPrimary")).click();
        Thread.sleep(5000);
        screenshot("./screenshot/admin_dashboard.png");
	}

    public void dashboard() throws InterruptedException, IOException {
        // click dashboard task
        driver.findElement(By.id("dashboard-task")).click();
        Thread.sleep(10000);
        screenshot("./screenshot/admin_task.png");
        driver.navigate().back();
        Thread.sleep(7000);
        
        // click dashboard user
        driver.findElement(By.id("dashboard-user")).click();
        Thread.sleep(7000);
        screenshot("./screenshot/admin_user.png");
        driver.navigate().back();
        Thread.sleep(7000);

        // click dashboard task type
        driver.findElement(By.id("dashboard-task_type")).click();
        Thread.sleep(7000);
        screenshot("./screenshot/admin_task_type.png");
        driver.navigate().back();
        Thread.sleep(7000);
	}

    public void admin_task_type() throws InterruptedException, IOException {
		// go to task type
        driver.findElement(By.xpath("//span[text()='Task Type']")).click();
        Thread.sleep(7000);
        
        // edit task type price
        driver.findElement(By.id("btn-edit")).click();
        Thread.sleep(1000);
        WebElement editPrice = driver.findElement(By.id("input-price"));
        Thread.sleep(1000);
        actions.doubleClick(editPrice).perform();
        Thread.sleep(1000);
        actions.sendKeys(Keys.BACK_SPACE).perform();
        Thread.sleep(1000);
        editPrice.sendKeys("2.0");
        Thread.sleep(1000);
        driver.findElement(By.id("btn-edit")).click();
        Thread.sleep(1000);
        screenshot("./screenshot/admin_edit_task_type_price.png");

        // add new task type
        driver.findElement(By.id("btn-add")).click();
        Thread.sleep(7000);
        WebElement inputName = driver.findElement(By.id("input-name"));
        actions.click(inputName).perform();
        inputName.sendKeys("Test New Task Type");
        Thread.sleep(1000); 
        WebElement inputPrice = driver.findElement(By.id("input-price"));
        actions.click(inputPrice).perform();
        inputPrice.sendKeys("2.5");
        driver.findElement(By.id("btn-done")).click();
        Thread.sleep(5000);
        screenshot("./screenshot/admin_add_task_type.png");  
	}

    public void admin_task() throws InterruptedException, IOException {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Actions actions = new Actions(driver);
		
        // go to task type
        driver.findElement(By.xpath("//span[text()='Task']")).click();
        Thread.sleep(7000);

        // button next dan prev
        driver.findElement(By.id("btn-next")).click();
        Thread.sleep(3000);  
        driver.findElement(By.id("btn-prev")).click();
        Thread.sleep(1000);  

        // search by task type
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000); 
        driver.findElement(By.id("Classification")).click();
        Thread.sleep(1000);  
        screenshot("./screenshot/admin_task_search_by_classification.png");  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("AI Summary Checking")).click();
        Thread.sleep(1000); 
        screenshot("./screenshot/admin_task_search_by_AISummaryChecking.png");  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("Translation")).click();
        screenshot("./screenshot/admin_task_search_by_translation.png");  
        Thread.sleep(1000);  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("Summary")).click();
        Thread.sleep(1000);
        screenshot("./screenshot/admin_task_search_by_summary.png");  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("all")).click();
        Thread.sleep(1000);
        
        // search by task name
        WebElement inputTaskName = driver.findElement(By.id("input-task_name"));
        actions.click(inputTaskName).perform();
        inputTaskName.sendKeys("re");    
        Thread.sleep(1000);
        screenshot("./screenshot/admin_task_search_by_task_name.png");  

        // search by task name and requester name
        WebElement inputRequesterName = driver.findElement(By.id("input-requester_name"));
        actions.click(inputRequesterName).perform();
        inputRequesterName.sendKeys("ar");   
        Thread.sleep(1000);
        screenshot("./screenshot/admin_task_search_by_task_name_and_requester_name.png");  
        
        // search by task name and requester name and task type classification
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("Classification")).click();
        Thread.sleep(1000); 
        screenshot("./screenshot/admin_task_search_by_task_name_and_requester_name_and_type_classification.png");  

        // klik detail ke 1
        driver.findElement(By.id("detailTask1")).click();
        Thread.sleep(5000); 
        screenshot("./screenshot/admin_detail_task"); 
        
        // klik data ke 8
        WebElement checkData = driver.findElement(By.id("taskData8"));
        js.executeScript("arguments[0].scrollIntoView(true);", checkData);
        Thread.sleep(2000);  
        actions.click(checkData).perform();
        screenshot("./screenshot/admin_task_detail_data.png");  
        Thread.sleep(2000);  
        WebElement buttonBack = driver.findElement(By.id("btn-back"));
        js.executeScript("arguments[0].scrollIntoView(true);", buttonBack);
        Thread.sleep(2000);  
        driver.navigate().back();
        Thread.sleep(5000); 
	}

    public void admin_user() throws InterruptedException, IOException {
        Actions actions = new Actions(driver);
        
        // go to user
        driver.findElement(By.xpath("//span[text()='User']")).click();
        Thread.sleep(7000);
        
        // search by name
        WebElement inputName = driver.findElement(By.id("input-name"));
        actions.click(inputName).perform();
        inputName.sendKeys("j");        
        screenshot("./screenshot/admin_user_search_by_name.png");  

        // search by role and name
        driver.findElement(By.id("input-role")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("cb-requester")).click();
        Thread.sleep(2000);
        screenshot("./screenshot/admin_user_search_by_role_requester.png");  
        driver.findElement(By.id("input-role")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("cb-worker")).click();
        screenshot("./screenshot/admin_user_search_by_role_worker.png");  
        Thread.sleep(2000);
        driver.findElement(By.id("input-role")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("cb-both")).click();
        screenshot("./screenshot/admin_user_search_by_role_both.png");  
        Thread.sleep(2000);
        actions.doubleClick(inputName).perform();
        Thread.sleep(1000); 
        actions.sendKeys(Keys.BACK_SPACE).perform();
        Thread.sleep(1000);  
        
        // button next dan prev
        driver.findElement(By.id("btn-next")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_user_next.png");  
        driver.findElement(By.id("btn-prev")).click();
        Thread.sleep(1000);  
        screenshot("./screenshot/admin_user_prev.png");  

        // klik detail user ke 2
        driver.findElement(By.id("detail2")).click();
        Thread.sleep(5000);  
        screenshot("./screenshot/admin_user_detail_user.png");  
        driver.findElement(By.id("userTaskDetail4")).click();
        Thread.sleep(5000);
        screenshot("./screenshot/admin_user_detail_task_user.png");  
        
        // klik detail task user ke 12
        WebElement checkData = driver.findElement(By.id("data12"));
        js.executeScript("arguments[0].scrollIntoView(true);", checkData);
        Thread.sleep(2000);  
        actions.click(checkData).perform();
        Thread.sleep(2000);
        screenshot("./screenshot/admin_user_detail_task_user_data.png");  
        WebElement buttonBack = driver.findElement(By.id("btn-back"));
        js.executeScript("arguments[0].scrollIntoView(true);", buttonBack);
        Thread.sleep(2000);  
        driver.navigate().back();
        Thread.sleep(5000);  
        driver.navigate().back();
        Thread.sleep(5000);
	}

    public void screenshot(String fileName) throws IOException {
		File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		FileUtils.copyFile(scrFile, new File(fileName));
	}
}
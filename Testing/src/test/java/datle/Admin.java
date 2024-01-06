
package datle;

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
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class Admin{
    WebDriver driver;
    Actions actions;
    JavascriptExecutor js;

    Admin (WebDriver driver){
        this.driver = driver; 
        actions = new Actions(driver);
        js = (JavascriptExecutor)driver;
    }

    public void signin() throws InterruptedException, IOException {
        // login as admin
		driver.get("https://datle-frontend.vercel.app");
        driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div/input")).sendKeys("admin@gmail.com");
        driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[2]/div/input")).sendKeys("admin");
        screenshot("./screenshot/login_admin.png");
        driver.findElement(By.xpath("/html/body/div/div/div[2]/form/button")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_dashboard.png");
	}

    public void dashboard_to_user() throws InterruptedException, IOException {
        // click dashboard user
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[4]/a[1]")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_user.png");
        driver.navigate().back();
        Thread.sleep(3000);
	}
    
    public void dashboard_to_task() throws InterruptedException, IOException {
        // click dashboard task
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[5]/a")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_task.png");
        driver.navigate().back();
        Thread.sleep(3000);
	}
    
    public void dashboard_to_task_type() throws InterruptedException, IOException {
        // click dashboard task type
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[4]/a[2]")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_task_type.png");
        driver.navigate().back();
        Thread.sleep(3000);
	}

    public void edit_task_type() throws InterruptedException, IOException {
		// go to task type
        driver.findElement(By.xpath("//span[text()='Task Type']")).click();
        Thread.sleep(3000);
        
        // edit task type price
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[2]/table/tbody/tr[1]/td[4]/button")).click();
        Thread.sleep(1000);
        WebElement editPrice = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[2]/table/tbody/tr[1]/td[3]/input"));
        Thread.sleep(1000);
        actions.doubleClick(editPrice).perform();
        Thread.sleep(1000);
        actions.sendKeys(Keys.BACK_SPACE).perform();
        Thread.sleep(1000);
        editPrice.sendKeys("2.0");
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[2]/table/tbody/tr[1]/td[4]/button")).click();
        Thread.sleep(1000);
        screenshot("./screenshot/admin_edit_task_type_price.png");
	}
    
    public void add_task_type() throws InterruptedException, IOException {
        // add new task type
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[2]/a/button")).click();
        Thread.sleep(3000);
        WebElement inputName = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/form/div[2]/div[1]/input"));
        actions.click(inputName).perform();
        inputName.sendKeys("Test New Task Type");
        Thread.sleep(1000); 
        WebElement inputPrice = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/form/div[2]/div[2]/input"));
        actions.click(inputPrice).perform();
        inputPrice.sendKeys("2.5");
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/form/div[1]/button[2]")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_add_task_type.png"); 
	}
    
    public void task_navigation() throws InterruptedException, IOException {
        // go to task type
//        driver.findElement(By.xpath("//span[text()='Task']")).click();
//        Thread.sleep(3000);

//        // button next dan prev
//        driver.findElement(By.id("btn-next")).click();
//        Thread.sleep(3000);  
//        driver.findElement(By.id("btn-prev")).click();
//        Thread.sleep(1000); 
    }
    
    public void task_filter() throws InterruptedException, IOException {
        driver.findElement(By.xpath("//span[text()='Task']")).click();
        Thread.sleep(3000);
        // search by task type
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div")).click();
        Thread.sleep(1000); 
        // click Classification
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[2]")).click();
        Thread.sleep(1000);  
        screenshot("./screenshot/admin_task_search_by_classification.png");  
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div")).click();
        Thread.sleep(1000);
        // click AI Summary Checking
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[3]")).click();
        Thread.sleep(1000); 
        screenshot("./screenshot/admin_task_search_by_AISummaryChecking.png");  
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div")).click();
        Thread.sleep(1000);  
        // click Translation
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[4]")).click();
        screenshot("./screenshot/admin_task_search_by_translation.png");  
        Thread.sleep(1000);  
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div")).click();
        Thread.sleep(1000);
        // click Summary
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[5]")).click();
        Thread.sleep(1000);
        screenshot("./screenshot/admin_task_search_by_summary.png");  
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div")).click();
        Thread.sleep(1000);
        // click all
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[1]")).click();
        Thread.sleep(1000);
        
        // search by task name
        WebElement inputTaskName = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[2]/div/div/input"));
        actions.click(inputTaskName).perform();
        inputTaskName.sendKeys("re");    
        Thread.sleep(1000);
        screenshot("./screenshot/admin_task_search_by_task_name.png");  

        // search by task name and requester name
        WebElement inputRequesterName = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[3]/div/div/input"));
        actions.click(inputRequesterName).perform();
        inputRequesterName.sendKeys("ar");   
        Thread.sleep(1000);
        screenshot("./screenshot/admin_task_search_by_task_name_and_requester_name.png");        
        
        // search by task name and requester name and task type classification
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div/div")).click();
        Thread.sleep(1000);  
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[2]")).click();
        Thread.sleep(1000); 
        screenshot("./screenshot/admin_task_search_by_task_name_and_requester_name_and_type_classification.png");  
    }
    
    
   
    public void task_to_detail() throws InterruptedException, IOException {
        // klik detail ke 1
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[8]/a/button")).click();
        Thread.sleep(3000); 
        screenshot("./screenshot/admin_detail_task"); 
	}
    
    public void task_detail_data() throws InterruptedException, IOException {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        // klik data ke 8
        WebElement checkData = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[3]/div[8]"));
        js.executeScript("arguments[0].scrollIntoView(true);", checkData);
        Thread.sleep(3000);  
        actions.click(checkData).perform();
        screenshot("./screenshot/admin_task_detail_data.png");  
        Thread.sleep(3000);  
	}
    
    public void task_button_back() throws InterruptedException, IOException {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        WebElement buttonBack = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/button"));
        js.executeScript("arguments[0].scrollIntoView(true);", buttonBack);
        Thread.sleep(3000);
	}
    
    public void user_filter() throws InterruptedException, IOException {
        Actions actions = new Actions(driver);
        
        // go to user
        driver.findElement(By.xpath("//span[text()='User']")).click();
        Thread.sleep(3000);
        
        // search by name
        WebElement inputName = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[2]/div/div/input"));
        actions.click(inputName).perform();
        inputName.sendKeys("j");        
        screenshot("./screenshot/admin_user_search_by_name.png");  

        // search by role and name
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div/div")).click();
        Thread.sleep(1000);  
        // click requester
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[2]")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_user_search_by_role_requester.png");  
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div/div")).click();
        Thread.sleep(1000);  
        // click worker
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[3]")).click();
        screenshot("./screenshot/admin_user_search_by_role_worker.png");  
        Thread.sleep(3000);
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div/div")).click();
        Thread.sleep(1000);  
        // click Requester & Worker
        driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[1]")).click();
        screenshot("./screenshot/admin_user_search_by_role_both.png");  
        Thread.sleep(3000);
        actions.doubleClick(inputName).perform();
        Thread.sleep(1000); 
        actions.sendKeys(Keys.BACK_SPACE).perform();
        Thread.sleep(1000);  
	}
    
    public void user_pagination() throws InterruptedException, IOException {
        // button next dan prev
//        driver.findElement(By.id("btn-next")).click();
//        Thread.sleep(3000);
//        screenshot("./screenshot/admin_user_next.png");  
//        driver.findElement(By.id("btn-prev")).click();
//        Thread.sleep(1000);  
//        screenshot("./screenshot/admin_user_prev.png");  
    }
    
    public void user_detail() throws InterruptedException, IOException {
        // klik detail user ke 2
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/table/tbody/tr[2]/td[7]/a/button")).click();
        Thread.sleep(3000);  
        screenshot("./screenshot/admin_user_detail.png");  
    }

    public void user_task_detail() throws InterruptedException, IOException {
    	// klik task user ke 4
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[3]/table/tbody/tr[4]/td[9]/a/button")).click();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_user_detail_task.png");  
	}
    
    public void user_task_detail_data() throws InterruptedException, IOException {  
        // klik detail task user ke 12
        WebElement checkData = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[3]/div[12]"));
        js.executeScript("arguments[0].scrollIntoView(true);", checkData);
        Thread.sleep(3000);  
        actions.click(checkData).perform();
        Thread.sleep(3000);
        screenshot("./screenshot/admin_user_detail_task_data.png");  
    }
    
    public void user_button_back() throws InterruptedException, IOException {  
        WebElement buttonBack = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/button"));
        js.executeScript("arguments[0].scrollIntoView(true);", buttonBack);
        Thread.sleep(3000);  
        driver.navigate().back();
        Thread.sleep(3000);  
        driver.navigate().back();
        Thread.sleep(3000);
    }
    
    public void signout() throws InterruptedException, IOException {  
        driver.findElement(By.xpath("//span[text()='Log Out']")).click();
        Thread.sleep(3000);
    }

    public void screenshot(String fileName) throws IOException {
		File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		FileUtils.copyFile(scrFile, new File(fileName));
	}
}
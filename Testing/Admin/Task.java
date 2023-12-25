package Admin;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class Task {
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Mario\\Desktop\\Software Testing\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.get("http://localhost:5173/signin");
        
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Actions actions = new Actions(driver);
    
        // login as admin
        driver.findElement(By.id(":r0:")).sendKeys("admin@gmail.com");
        driver.findElement(By.id(":r1:")).sendKeys("admin");
        driver.findElement(By.cssSelector("button.MuiButton-containedPrimary")).click();
        Thread.sleep(7000);
        
        // click dashboard task
        driver.findElement(By.id("dashboard-task")).click();
        Thread.sleep(7000);
        
        // search by task type
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("Classification")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("AI Summary Checking")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("Translation")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("Summary")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("all")).click();
        Thread.sleep(1000);
        
        // search by task name
        WebElement inputTaskName = driver.findElement(By.id("input-task_name"));
        actions.click(inputTaskName).perform();
        inputTaskName.sendKeys("re");    
        Thread.sleep(1000);

        // search by task name and requester name
        WebElement inputRequesterName = driver.findElement(By.id("input-requester_name"));
        actions.click(inputRequesterName).perform();
        inputRequesterName.sendKeys("ar");   
        Thread.sleep(1000);
        
        // search by task name and requester name and task type classification
        driver.findElement(By.id("input-type")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("Classification")).click();
        Thread.sleep(1000); 
        
        // klik detail ke 1
        driver.findElement(By.id("detailTask1")).click();
        Thread.sleep(5000); 
        
        // klik data ke 8
        WebElement checkData = driver.findElement(By.id("taskData8"));
        js.executeScript("arguments[0].scrollIntoView(true);", checkData);
        Thread.sleep(2000);  
        actions.click(checkData).perform();
        Thread.sleep(2000);  
        WebElement buttonBack = driver.findElement(By.id("btn-back"));
        js.executeScript("arguments[0].scrollIntoView(true);", buttonBack);
        Thread.sleep(2000);  
        driver.navigate().back();
        Thread.sleep(5000); 
        driver.close();
        driver.quit();
    }
}

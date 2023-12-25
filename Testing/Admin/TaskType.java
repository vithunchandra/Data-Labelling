package Admin;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class TaskType {
	public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Mario\\Desktop\\Software Testing\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.get("http://localhost:5173/signin");
        
        Actions actions = new Actions(driver);
        
        // login as admin
        driver.findElement(By.id(":r0:")).sendKeys("admin@gmail.com");
        driver.findElement(By.id(":r1:")).sendKeys("admin");
        driver.findElement(By.cssSelector("button.MuiButton-containedPrimary")).click();
        Thread.sleep(7000);

        // click dashboard task type
        driver.findElement(By.id("dashboard-task_type")).click();
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
        driver.close();
        driver.quit();
    }
}

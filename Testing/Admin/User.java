package Admin;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class User {
	public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Mario\\Desktop\\Software Testing\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        driver.manage().window().maximize();

        driver.get("http://localhost:5173/signin");
        
        Actions actions = new Actions(driver);
        
        // login as admin
        driver.findElement(By.id(":r0:")).sendKeys("admin@gmail.com");
        driver.findElement(By.id(":r1:")).sendKeys("admin");
        driver.findElement(By.cssSelector("button.MuiButton-containedPrimary")).click();
        Thread.sleep(7000);

        // click dashboard user
        driver.findElement(By.id("dashboard-user")).click();
        Thread.sleep(7000);
        
        // search by name
        WebElement inputName = driver.findElement(By.id("input-name"));
        actions.click(inputName).perform();
        inputName.sendKeys("j");        
        
        // search by role and name
        driver.findElement(By.id("input-role")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("cb-requester")).click();
        Thread.sleep(2000);
        driver.findElement(By.id("input-role")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("cb-worker")).click();
        Thread.sleep(2000);
        driver.findElement(By.id("input-role")).click();
        Thread.sleep(1000);  
        driver.findElement(By.id("cb-both")).click();
        Thread.sleep(2000);
        actions.doubleClick(inputName).perform();
        Thread.sleep(1000); 
        actions.sendKeys(Keys.BACK_SPACE).perform();
        Thread.sleep(1000);  
        
        // button next dan prev
        driver.findElement(By.id("btn-next")).click();
        Thread.sleep(3000);  
        driver.findElement(By.id("btn-prev")).click();
        Thread.sleep(1000);  

        // klik detail user ke 2
        driver.findElement(By.id("detail2")).click();
        Thread.sleep(5000);  
        driver.findElement(By.id("userTaskDetail4")).click();
        Thread.sleep(5000);  
        // klik detail task user ke 12
        WebElement checkData = driver.findElement(By.id("data12"));
        js.executeScript("arguments[0].scrollIntoView(true);", checkData);
        Thread.sleep(2000);  
        actions.click(checkData).perform();
        Thread.sleep(2000);  
        WebElement buttonBack = driver.findElement(By.id("btn-back"));
        js.executeScript("arguments[0].scrollIntoView(true);", buttonBack);
        Thread.sleep(2000);  
        driver.navigate().back();
        Thread.sleep(5000);  
        driver.navigate().back();
        Thread.sleep(5000); 
        driver.close();
        driver.quit();
	}
}

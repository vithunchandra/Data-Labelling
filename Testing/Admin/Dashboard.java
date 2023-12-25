package Admin;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Dashboard {
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Mario\\Desktop\\Software Testing\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.get("http://localhost:5173/signin");
                
        // login as admin
        driver.findElement(By.id(":r0:")).sendKeys("admin@gmail.com");
        driver.findElement(By.id(":r1:")).sendKeys("admin");
        driver.findElement(By.cssSelector("button.MuiButton-containedPrimary")).click();
        Thread.sleep(7000);
        
        // click dashboard task
        driver.findElement(By.id("dashboard-task")).click();
        Thread.sleep(10000);
        driver.navigate().back();
        Thread.sleep(7000);
        
        // click dashboard user
        driver.findElement(By.id("dashboard-user")).click();
        Thread.sleep(7000);
        driver.navigate().back();
        Thread.sleep(7000);

        // click dashboard task type
        driver.findElement(By.id("dashboard-task_type")).click();
        Thread.sleep(7000);
        driver.navigate().back();
        Thread.sleep(7000);
        driver.close();
        driver.quit();
    }
}

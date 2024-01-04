/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.JavaTesting;

import io.github.bonigarcia.wdm.WebDriverManager;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 *
 * @author LVOILA
 */
public class NavigationTest {
    private final String website_name;
    public NavigationTest() throws InterruptedException, InterruptedException, InterruptedException {
        WebDriverManager.chromedriver().setup();
        this.website_name = MainTest.website_name;
    }


    public void screenshot(WebDriver driver, String fileName) throws IOException {
        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File(fileName));
    }
    
    public WebDriver requesterLogin() throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get(website_name );
        String email_now = "demo_acc2@email.com";
        
        WebElement emailInput = driver.findElement(By.id(":r0:"));
        emailInput.sendKeys(email_now);
       
        
        WebElement passInput = driver.findElement(By.id(":r1:"));
        passInput.sendKeys("demo_pass");
        
        WebElement signInButton = driver.findElement(By.className("MuiButton-containedPrimary"));
        signInButton.click();
        
        Thread.sleep(1000);
        return driver;
    }
    
    @Test
    public void checkNavigateAddTask() throws InterruptedException {
        WebDriver driver = requesterLogin();
        WebElement newTaskButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiButton-containedSuccess') and contains(., 'New Task')]"));
        newTaskButton.click();
        
        Thread.sleep(500);
        String currentUrl = driver.getCurrentUrl();
        boolean url_check1 = false;
        if(currentUrl.equals(this.website_name + "/requester/create_task/add")) {
            url_check1 = true;
        }
        Assert.assertTrue(url_check1);
        
        Thread.sleep(500);
        WebElement dashboardButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and contains(@class, 'Mui-selected')]//span[text()='Dashboard']"));
        dashboardButton.click();
        Thread.sleep(500);
        WebElement createTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and contains(@class, 'css-1ulohm0')]//span[text()='Create Task']"));
        createTaskButton.click();
                  
        
        Thread.sleep(500);
        currentUrl = driver.getCurrentUrl();
        boolean url_check2 = false;
        if(currentUrl.equals(this.website_name + "/requester/create_task")) {
            url_check2 = true;
        }
        Assert.assertTrue(url_check2);
        
        
        Thread.sleep(500);
        WebElement addTaskButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiIconButton-root') and contains(@class, 'css-1yxmbwk')]"));
        addTaskButton.click();
        
        Thread.sleep(500);
        currentUrl = driver.getCurrentUrl();
        boolean url_check3 = false;
        if(currentUrl.equals(this.website_name + "/requester/create_task/add")) {
            url_check3 = true;
        }
        Assert.assertTrue(url_check3);
               
        
        Thread.sleep(1000);
        driver.close();
        
    }
    
    @Test
    public void checkNavigateOtherNavbar() throws InterruptedException {
        WebDriver driver = requesterLogin();
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        Thread.sleep(500);
        String currentUrl = driver.getCurrentUrl();
        boolean url_check_now = false;
        if(currentUrl.equals(this.website_name + "/requester/monitor_task")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        Thread.sleep(500);
        WebElement banListButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Ban List']"));
        banListButton.click();
        Thread.sleep(500);
        currentUrl = driver.getCurrentUrl();
        url_check_now = false;
        if(currentUrl.equals(this.website_name + "/requester/ban_list")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        Thread.sleep(500);
        WebElement topUpButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Top Up']"));
        topUpButton.click();
        Thread.sleep(500);
        currentUrl = driver.getCurrentUrl();
        url_check_now = false;
        if(currentUrl.equals(this.website_name + "/requester/top_up")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        Thread.sleep(500);
        WebElement logoutButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Log Out']"));
        logoutButton.click();
        Thread.sleep(500);
        currentUrl = driver.getCurrentUrl();
        url_check_now = false;
        if(currentUrl.equals(this.website_name + "/signin")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        Thread.sleep(500);
        driver.close();
        
    }
    
    
}

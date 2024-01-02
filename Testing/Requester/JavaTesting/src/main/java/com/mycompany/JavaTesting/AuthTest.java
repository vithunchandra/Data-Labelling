/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.JavaTesting;

import io.github.bonigarcia.wdm.WebDriverManager;
import java.io.IOException;
import org.openqa.selenium.By;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.io.File;
import org.openqa.selenium.OutputType;
import org.apache.commons.io.FileUtils;
      
public class AuthTest {
    
    private final String website_name;
    public AuthTest() {
        WebDriverManager.chromedriver().setup();
        this.website_name = MainTest.website_name;
    }


    public void screenshot(WebDriver driver, String fileName) throws IOException {
        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File(fileName));
    }
    
    

//    @Test
    public void checkRegister() throws InterruptedException {
        // Your test logic here
        String email_now = "demo_acc2@email.com";
        WebDriver driver = new ChromeDriver();
        driver.get(this.website_name );
        WebElement signUpLink = driver.findElement(By.xpath("//div[@class='mt-3 text-end']//a[text()='Sign up']"));
        signUpLink.click();
        Thread.sleep(100);
       
        
        WebElement emailInput = driver.findElement(By.id(":r2:"));
        emailInput.sendKeys(email_now);
        
        WebElement nameInput = driver.findElement(By.id(":r3:"));
        nameInput.sendKeys("demo_acc1");
        
        WebElement passInput = driver.findElement(By.id(":r4:"));
        passInput.sendKeys("demo_pass");
        
        WebElement passInput2 = driver.findElement(By.id(":r5:"));
        passInput2.sendKeys("demo_pass");
        
        WebElement radioButtonReq = driver.findElement(By.cssSelector("input[value='requester'][type='radio']"));
        radioButtonReq.click();
        
        WebElement signUpButton = driver.findElement(By.className("MuiButton-containedPrimary"));
        signUpButton.click();
        
        Thread.sleep(500);
        String currentUrl = driver.getCurrentUrl();
        
        boolean can_login_or_exist = false;
        if(currentUrl.equals(this.website_name + "/requester")) {
            can_login_or_exist = true;
        }
        else {
            WebElement errorMessageElement = driver.findElement(By.className("text-danger"));
            String errorMessage = errorMessageElement.getText();
            String temp_text_now = "User with email "+ email_now +" already exists";
            if(temp_text_now.equals(errorMessage)) {
                can_login_or_exist = true;
            }
        }   
        
        
        Assert.assertTrue(can_login_or_exist);
        driver.close();
    }
    
    @Test
    public void checkLogin() throws InterruptedException {
        // Your test logic here
        WebDriver driver = new ChromeDriver();
        driver.get(this.website_name);
        String email_now = "demo_acc_fail@email.com";
        
        WebElement emailInput = driver.findElement(By.id(":r0:"));
        emailInput.sendKeys(email_now);
       
        
        WebElement passInput = driver.findElement(By.id(":r1:"));
        passInput.sendKeys("demo_pass");
        
        WebElement signInButton = driver.findElement(By.className("MuiButton-containedPrimary"));
        signInButton.click();
        
        Thread.sleep(500);
        String currentUrl = driver.getCurrentUrl();
        
        boolean can_login_or_exist = false;
        if(currentUrl.equals(this.website_name + "/requester")) {
            can_login_or_exist = true;
        } else {
            String temp_text_now = "User with email "+email_now+" is not exist";
            WebElement errorMessageElement = driver.findElement(By.className("text-danger"));
            String errorMessage = errorMessageElement.getText();
            
            if(temp_text_now.equals(errorMessage)) {
                can_login_or_exist = true;
            }
        }
       
        Assert.assertTrue(can_login_or_exist);
        
        driver.close();
    }
}

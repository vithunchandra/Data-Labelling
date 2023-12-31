/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package datle;

import java.io.File;
import java.io.IOException;
import java.util.List;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

/**
 *
 * @author LVOILA
 */
public class Requester {
    private WebDriver driver;
    private String website_name;
	
    @BeforeTest
	public void setup() {
    	System.setProperty("webdriver.chrome.driver", "./driver/chromedriver.exe");
		driver = new ChromeDriver();
        website_name = "https://datle-frontend.vercel.app";
	}
    
    @AfterTest
	public void close() {
		driver.close();
	}
    private void screenshot(String fileName) throws IOException, InterruptedException {
        Thread.sleep(250);
        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File(fileName));
        Thread.sleep(250);
    }
    
//    @Test(priority = 2)
    private WebDriver requesterLogin() throws InterruptedException {
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
    
    @Test(priority = 3)
    public void checkRegister() throws InterruptedException, IOException {
        // Your test logic here
        driver.get(this.website_name );
        String email_now = "demo_acc2@email.com";
        WebElement signUpLink = driver.findElement(By.xpath("//div[@class='mt-3 text-end']//a[text()='Sign up']"));
        signUpLink.click();
        Thread.sleep(500);
       
        
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
        
        screenshot("./screenshot/requester_sign_in_form.png");
        
        Thread.sleep(500);
        WebElement signUpButton = driver.findElement(By.className("MuiButton-containedPrimary"));
        signUpButton.click();
        
        Thread.sleep(500);
        String currentUrl = driver.getCurrentUrl();
        
        boolean can_login_or_exist = false;
        if(currentUrl.equals(this.website_name + "/requester")) {
            can_login_or_exist = true;
            screenshot("./screenshot/requester_sucess_register.png");
        }
        else {
            Thread.sleep(5000);
            WebElement errorMessageElement = driver.findElement(By.className("text-danger"));
            String errorMessage = errorMessageElement.getText();
            String temp_text_now = "User with email "+ email_now +" already exists";
            if(temp_text_now.equals(errorMessage)) {
                can_login_or_exist = true;
                screenshot("./screenshot/requester_fail_register.png");
            }
        }   
        
        
        Assert.assertTrue(can_login_or_exist);
        Thread.sleep(1000);
    }
    
    @Test(priority = 4)
    public void checkLogin() throws InterruptedException, IOException {
        // Your test logic here
        driver.get(this.website_name);
        String email_now = "demo_acc_fail@email.com";
        
        WebElement emailInput = driver.findElement(By.id(":r0:"));
        emailInput.sendKeys(email_now);
       
        
        WebElement passInput = driver.findElement(By.id(":r1:"));
        passInput.sendKeys("demo_pass");
        
        WebElement signInButton = driver.findElement(By.className("MuiButton-containedPrimary"));
        signInButton.click();
        
        Thread.sleep(1000);
        String currentUrl = driver.getCurrentUrl();
        
        boolean can_login_or_exist = false;
        if(currentUrl.equals(this.website_name + "/requester")) {
            can_login_or_exist = true;
            screenshot("./screenshot/requester_sucess_login.png");
        } else {
            Thread.sleep(5000);
            String temp_text_now = "User with email "+email_now+" is not exist";
            WebElement errorMessageElement = driver.findElement(By.className("text-danger"));
            String errorMessage = errorMessageElement.getText();
            
            if(temp_text_now.equals(errorMessage)) {
                can_login_or_exist = true;
                screenshot("./screenshot/requester_fail_login.png");
            }
        }
       
        Assert.assertTrue(can_login_or_exist);
        Thread.sleep(1000);
    }
    
    @Test(priority = 5)
    public void checkNavigateAddTask() throws InterruptedException, IOException {
        driver = requesterLogin();
        WebElement newTaskButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiButton-containedSuccess') and contains(., 'New Task')]"));
        newTaskButton.click();
        
        Thread.sleep(1000);
        String currentUrl = driver.getCurrentUrl();
        boolean url_check1 = false;
        if(currentUrl.equals(this.website_name + "/requester/create_task/add")) {
            url_check1 = true;
        }
        Assert.assertTrue(url_check1);
        screenshot("./screenshot/requester_navigate_add_task.png");
        
        Thread.sleep(1000);
        WebElement dashboardButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and contains(@class, 'Mui-selected')]//span[text()='Dashboard']"));
        dashboardButton.click();
        Thread.sleep(1000);
        WebElement createTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and contains(@class, 'css-1ulohm0')]//span[text()='Create Task']"));
        createTaskButton.click();
        screenshot("./screenshot/requester_navigate_create_task.png");
                  
        
        Thread.sleep(1000);
        currentUrl = driver.getCurrentUrl();
        boolean url_check2 = false;
        if(currentUrl.equals(this.website_name + "/requester/create_task")) {
            url_check2 = true;
        }
        Assert.assertTrue(url_check2);
        
        
        Thread.sleep(1000);
        WebElement addTaskButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiIconButton-root') and contains(@class, 'css-1yxmbwk')]"));
        addTaskButton.click();
        
        Thread.sleep(1000);
        currentUrl = driver.getCurrentUrl();
        boolean url_check3 = false;
        if(currentUrl.equals(this.website_name + "/requester/create_task/add")) {
            url_check3 = true;
        }
        Assert.assertTrue(url_check3);
        
        screenshot("./screenshot/requester_navigate_add_task_2.png");
        
        
        Thread.sleep(1000);
    }
    
    @Test(priority = 6)
    public void checkNavigateOtherNavbar() throws InterruptedException, IOException {
        driver = requesterLogin();
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        Thread.sleep(1000);
        String currentUrl = driver.getCurrentUrl();
        boolean url_check_now = false;
        if(currentUrl.equals(this.website_name + "/requester/monitor_task")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
    
        screenshot("./screenshot/requester_navigate_monitor_task.png");
        
        Thread.sleep(1000);
        WebElement banListButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Ban List']"));
        banListButton.click();
        Thread.sleep(1000);
        currentUrl = driver.getCurrentUrl();
        url_check_now = false;
        if(currentUrl.equals(this.website_name + "/requester/ban_list")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        screenshot("./screenshot/requester_navigate_ban_list.png");
        
        Thread.sleep(1000);
        WebElement topUpButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Top Up']"));
        topUpButton.click();
        Thread.sleep(1000);
        currentUrl = driver.getCurrentUrl();
        url_check_now = false;
        if(currentUrl.equals(this.website_name + "/requester/top_up")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        screenshot("./screenshot/requester_navigate_top_up.png");
        
        Thread.sleep(1000);
        WebElement logoutButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Log Out']"));
        logoutButton.click();
        Thread.sleep(1000);
        currentUrl = driver.getCurrentUrl();
        url_check_now = false;
        if(currentUrl.equals(this.website_name + "/signin")) {
            url_check_now = true;
        }
        Assert.assertTrue(url_check_now);
        
        screenshot("./screenshot/requester_logout.png");
        
        Thread.sleep(1000);
        
    }
    
    @Test(priority = 7)
    public void checkCreateTask() throws InterruptedException, IOException {
        driver = requesterLogin();
        
        WebElement newTaskButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiButton-containedSuccess') and contains(., 'New Task')]"));
        newTaskButton.click();
        Thread.sleep(500);
        
       
        WebElement nameInput = driver.findElement(By.cssSelector("input.form-control[name='name']"));
        nameInput.sendKeys("Sentiment analysis");
       
        WebElement posslabInput1 = driver.findElement(By.cssSelector("input.form-control[name='posslab.0']"));
        posslabInput1.sendKeys("Positive");
        WebElement posslabInput2 = driver.findElement(By.cssSelector("input.form-control[name='posslab.1']"));
        posslabInput2.sendKeys("Negative");
        
        
        WebElement instructionTextarea = driver.findElement(By.cssSelector("textarea.form-control[name='instruction']"));
        instructionTextarea.sendKeys("Please choose whether this restaurant review is positive or not!");
        
        WebElement dataChip = driver.findElement(By.xpath("//div[contains(@class, 'MuiChip-root') and contains(@class, 'css-kqdgoz')]//span[text()='Data']"));
        dataChip.click();
        
        WebElement dataInput = driver.findElement(By.cssSelector("input.form-control[name='data.0']"));
        dataInput.sendKeys("This restaurant have very good atmosphere, the food is also good, the price is a bit expensive but it's really worth the price!");
        WebElement dataInput2 = driver.findElement(By.cssSelector("input.form-control[name='data.1']"));
        dataInput2.sendKeys("I never thought that the taste of this ubelieveable expensive restaurant is very bad, not to mention the portion is almost none, what a rip-off!");
        
        screenshot("./screenshot/add_task_form_input.png");
        
        dataInput2.sendKeys(Keys.ENTER);
        
        Thread.sleep(1000);
        driver.navigate().back();
        
        Thread.sleep(500);
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        screenshot("./screenshot/monitor_task_after_add.png");
      
        
    }
    
    @Test(priority = 8)
    public void topUp() throws InterruptedException, IOException {
        driver = requesterLogin();
        String ammount = "10000";
        int ammount_int = Integer.parseInt(ammount);
                
        
        Thread.sleep(500);
        String moneyText = driver.findElement(By.cssSelector("label.me-3")).getText();
        int moneyValue = Integer.parseInt(moneyText.replaceAll("[^0-9]", ""));
        
        WebElement topUpButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Top Up']"));
        topUpButton.click();
        Thread.sleep(500);
        
        WebElement amountInputElement = driver.findElement(By.cssSelector("input[name='amount']"));
        amountInputElement.sendKeys(Keys.BACK_SPACE);
        amountInputElement.sendKeys(ammount);
        
        WebElement bankAccountInputElement = driver.findElement(By.cssSelector("input[name='bank_account']"));
        bankAccountInputElement.sendKeys("12321312424");
        
        screenshot("./screenshot/requester_top_up_form.png");
        
        WebElement topUpSubmitButton = driver.findElement(By.cssSelector("button.MuiButton-containedSuccess"));
        topUpSubmitButton.click();
        
        screenshot("./screenshot/requester_after_top_up.png");
        
        
        Thread.sleep(500);
        driver = requesterLogin();
        Thread.sleep(500);
        
        moneyText = driver.findElement(By.cssSelector("label.me-3")).getText();
        int moneyValueAfter = Integer.parseInt(moneyText.replaceAll("[^0-9]", ""));
        
        Boolean checkAmmountTrue = true;
        if(moneyValue + ammount_int != moneyValueAfter) {
            checkAmmountTrue = false;
        }
        
        Assert.assertTrue(checkAmmountTrue);

        Thread.sleep(500);
    }
    
    @Test(priority = 9)
    public void checkCreateTaskSummary() throws InterruptedException, IOException {
        driver = requesterLogin();
        
        WebElement newTaskButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiButton-containedSuccess') and contains(., 'New Task')]"));
        newTaskButton.click();
        Thread.sleep(500);
        
        WebElement nameInput = driver.findElement(By.cssSelector("input[name='name']"));
        nameInput.sendKeys("Task Merangkum 1");


        Select typeDropdown = new Select(driver.findElement(By.id("type")));
        typeDropdown.selectByValue("65856bcef38c6565a1eea9c1");
        Thread.sleep(100);

        WebElement instructionTextArea = driver.findElement(By.cssSelector("textarea[name='instruction']"));
        instructionTextArea.sendKeys("Rangkumah teks berikut dalam 1 kalimat singkat!");
        Thread.sleep(100);
        
        WebElement dataChip = driver.findElement(By.cssSelector("div.MuiChip-root span.MuiChip-label"));
        dataChip.click();
        dataChip.click();
        Thread.sleep(300);
        
        WebElement dataInput0 = driver.findElement(By.cssSelector("input[name='data.0']"));
        dataInput0.sendKeys("Teks untuk dirangkum 1");
        WebElement dataInput1 = driver.findElement(By.cssSelector("input[name='data.1']"));
        dataInput1.sendKeys("Teks untuk dirangkum 2");
        WebElement dataInput2 = driver.findElement(By.cssSelector("input[name='data.2']"));
        dataInput2.sendKeys("Teks untuk dirangkum 3");

        screenshot("./screenshot/add_task_summarization_form_input.png");

        dataInput2.sendKeys(Keys.ENTER);        
        Thread.sleep(1000);
        driver.navigate().back();
        
        Thread.sleep(500);
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        screenshot("./screenshot/monitor_task_after_add_summarization.png");
    }
    
    @Test(priority = 10)
    public void closeAllTaskCheck() throws InterruptedException, IOException {
        driver = requesterLogin();
        
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        screenshot("./screenshot/before_close_all.png");
        List<WebElement> openButtons = driver.findElements(By.xpath("//button[contains(@class, 'MuiButton-containedSuccess') and contains(@class, 'css-5zrdtn')]"));
      
        Boolean checkAll = true;
        for (int i = 0;i < openButtons.size();i++) {
            try {
                WebElement btn_now = openButtons.get(i);
                btn_now.click();
            } catch(Exception e) {
                System.out.println("error");
                checkAll = false; 
            }
            
        }
        Assert.assertTrue(checkAll);
        Thread.sleep(1000);
        screenshot("./screenshot/after_close_all.png");

    }
    
    @Test(priority = 11)
    public void openAllTaskCheck() throws InterruptedException, IOException {
        driver = requesterLogin();
        
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        screenshot("./screenshot/before_open_all.png");
        List<WebElement> closeButtons = driver.findElements(By.xpath("//button[contains(@class,'MuiButton-containedError')]"));
      
        Boolean checkAll = true;
        for (int i = 0;i < closeButtons.size();i++) {
            try {
                WebElement btn_now = closeButtons.get(i);
                btn_now.click();
            } catch(Exception e) {
                System.out.println("error");
                checkAll = false; 
            }
            
        }
        Assert.assertTrue(checkAll);
        Thread.sleep(1000);
        screenshot("./screenshot/after_open_all.png");
    }
    
    @Test(priority = 12)
    public void editTask() throws InterruptedException, IOException {
        driver = requesterLogin();
        Thread.sleep(500);
        String task_now = "Summary";
        
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        
        Thread.sleep(500);
        List<WebElement> rowsWithTask = driver.findElements(By.xpath("//td[text()='"+task_now+"']/ancestor::tr"));
        Thread.sleep(500);
        
        String id_row = "";
        System.out.println("Number of task:" + rowsWithTask.size());
        for(int i = 0;i < rowsWithTask.size();i++) {
//            WebElement rowWithTask = driver.findElements(By.xpath("//td[text()='"+task_now+"']/ancestor::tr")).get(i);
            WebElement rowWithTask = rowsWithTask.get(i);
            String[] all_row_text_now = rowWithTask.getText().split(" ");
           
            id_row = all_row_text_now[0];
            String btn_text = all_row_text_now[all_row_text_now.length - 1].split("\n")[0];
            if(btn_text.equals("Opened")) {
                WebElement closeButton = rowWithTask.findElement(By.xpath(".//button"));
                closeButton.click();
                Thread.sleep(500);
                screenshot("./screenshot/close_task_that_want_to_be_editted.png");
            } 
            

            break;
        }
        
        Boolean canEdit = false;
        if(!rowsWithTask.isEmpty()) {
            WebElement createTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and contains(@class, 'css-1ulohm0')]//span[text()='Create Task']"));
            createTaskButton.click();
            
            System.out.println("ID_NOW : " + id_row);
            List<WebElement> rowsAddTask = driver.findElements(By.xpath("//table[contains(@class,'table')]/tbody/tr"));
            
            Thread.sleep(1000);
            System.out.println("ALL ADD TASK COUNT:" + rowsAddTask.size());
            
            for(int i = 0;i < rowsAddTask.size();i++) {
                WebElement rowAddTask = driver.findElements(By.xpath("//table[contains(@class,'table')]/tbody/tr")).get(i);
                String[] rowAddTaskTextSplit = rowAddTask.getText().split(" ");
                
                if(rowAddTaskTextSplit[0].equals(id_row)) {
                    System.out.println(rowAddTaskTextSplit[0] + ":" + rowAddTaskTextSplit[rowAddTaskTextSplit.length -1 ]);
                    screenshot("./screenshot/click_edit_on_closed_task.png");
                    WebElement edit_btn = rowAddTask.findElement(By.xpath(".//button"));
                    edit_btn.click();
                    canEdit = true;    
                    
                    break;
                }
                
                
            }
            
        }
        Thread.sleep(500);
        if(canEdit) {
            List<WebElement> editButtonsNameCred = driver.findElements(By.xpath("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium ms-1 css-1yxmbwk']"));
            System.out.println("COUNT EDIT:" + editButtonsNameCred.size());
            editButtonsNameCred.get(0).click();
            Thread.sleep(500);
            editButtonsNameCred.get(1).click();
            Thread.sleep(500);
            
            WebElement editDescButton = driver.findElement(By.xpath("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk'][@type='submit']"));
            editDescButton.click();
            Thread.sleep(500);
            WebElement nameInput = driver.findElement(By.cssSelector("input.w-50.form-control[name='name']"));
            nameInput.sendKeys(" Edited!");
            Thread.sleep(500);
            WebElement credibilityInput = driver.findElement(By.xpath("//input[@type='number' and @class='w-25 form-control'][@name='credibility']"));
            credibilityInput.clear();
            credibilityInput.sendKeys("80");
            Thread.sleep(500);
            WebElement instructionTextarea = driver.findElement(By.xpath("//textarea[@name='instruction' and @class='w-100 form-control']"));
            instructionTextarea.sendKeys(" Edited!");
            nameInput.sendKeys(Keys.ENTER);
            Thread.sleep(500);
            screenshot("./screenshot/requester_edit_task.png");
            WebElement saveButton = driver.findElement(By.cssSelector("button.MuiButton-containedSuccess[type='submit']"));
            saveButton.click();
            Thread.sleep(500);
            screenshot("./screenshot/saved_requester_edit_task.png");
        }
        
        
    }   
    
    @Test(priority = 13)
    public void checkChat() throws InterruptedException, IOException {
        driver = requesterLogin();
        
        WebElement monitorTaskButton = driver.findElement(By.xpath("//div[contains(@class, 'MuiListItemButton-root') and not(contains(@class, 'Mui-selected'))]//span[text()='Monitor Task']"));
        monitorTaskButton.click();
        Thread.sleep(750);
        
        WebElement rowElement = driver.findElement(By.xpath("//td[text()='9']/parent::tr"));
        rowElement.click();
        Thread.sleep(750);
        
        
        WebElement detailElement = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div/div[2]/table/tbody/tr[18]/td/div/div/a/button"));
        detailElement.click();
        Thread.sleep(1000);
        
        WebElement forumButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiButton-containedSuccess') and contains(@class, 'position-fixed') and contains(@class, 'fixed-bottom')]"));
        forumButton.click();
        Thread.sleep(500);
        
        WebElement avatarElement = driver.findElement(By.xpath("//div[contains(@class, 'p-3')]//img[contains(@class, 'MuiAvatar-img')]"));
        avatarElement.click();
        Thread.sleep(500);
        
        WebElement textareaElement = driver.findElement(By.cssSelector("textarea.MuiInputBase-input[name='chat']"));
        textareaElement.sendKeys("Halo?");
        screenshot("./screenshot/requester_chat.png");

        WebElement sendButton = driver.findElement(By.xpath("//button[contains(@class, 'MuiButton-containedPrimary') and contains(text(), 'Send')]"));
        sendButton.click();
        Thread.sleep(500);
        screenshot("./screenshot/requester_after_chat.png");
    }
    
}

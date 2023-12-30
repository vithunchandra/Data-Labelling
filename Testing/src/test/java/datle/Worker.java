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
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class Worker {
	WebDriver driver;
	
	Worker(WebDriver driver){
		this.driver = driver;
	}
	
	public void register() throws InterruptedException, IOException {
		driver.get("https://datle-frontend.vercel.app");
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/form/div[3]/a")).click();
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
		driver.findElement(By.xpath("//input[@name='email']")).sendKeys("vithunchandra@gmail.com");
		driver.findElement(By.xpath("//input[@name='name']")).sendKeys("vithunchan");
		driver.findElement(By.xpath("//input[@name='password']")).sendKeys("vithun11");
		driver.findElement(By.xpath("//input[@name='confirmPassword']")).sendKeys("vithun11");
		driver.findElement(By.xpath("//input[@value='worker']")).click();
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(10000);
		screenshot("./screenshot/register.png");
		driver.findElement(By.xpath("//span[text()='Log Out']")).click();
	}
	
	public void signin() throws InterruptedException, IOException {
		driver.get("https://datle-frontend.vercel.app");
		driver.findElement(By.xpath("//input[@name='email']")).sendKeys("Lola.Hills-Johnston69@hotmail.com");
		driver.findElement(By.xpath("//input[@name='password']")).sendKeys("FDiFjQ");
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/login.png");
	}
	
	public void dashboard() throws InterruptedException, IOException {
		driver.findElement(By.xpath("//button[text()='Label']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/last_task.png");
		driver.navigate().back();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//div[contains(@class, 'card-hover')]")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/last_task.png");
		driver.navigate().back();
		Thread.sleep(5000);
	}
	
	public void marketplace() throws InterruptedException, IOException{
		JavascriptExecutor jse = (JavascriptExecutor)driver;
		driver.findElement(By.xpath("//span[text()='Marketplace']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/marketplace.png");
		
		jse.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//button[text()='Next']")));
		Thread.sleep(2000);
		driver.findElement(By.xpath("//button[text()='Next']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/marketplace_next_pagination.png");
		jse.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//button[text()='Previous']")));
		driver.findElement(By.xpath("//button[text()='Previous']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/marketplace_previous_pagination.png");
		jse.executeScript("document.querySelector(\".overflow-auto\").scroll(0, -1080);");
		Thread.sleep(1000);
		jse.executeScript("document.querySelector(\".overflow-auto\").scroll(0, -1080);");
		Thread.sleep(1000);
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//li[@data-value='Classification']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[2]/div[1]/form/div[3]/div/div/div/div/button")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//button[text()='5']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//input[@name='name']")).sendKeys("ack");
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/marketplace_filter.png");
		driver.findElement(By.xpath("//button[text()='Detail']")).click();
		Thread.sleep(5000);
		driver.navigate().back();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//input[@name='name']")).sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//button[text()='Detail']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/marketplace_detail.png");
		driver.findElement(By.xpath("//button[text()='Next']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//button[text()='Previous']")).click();
		Thread.sleep(5000);
//		driver.findElement(By.xpath("//button[text()='Accept']")).click();
//		Thread.sleep(5000);
//		screenshot("./screenshot/marketplace_accept.png");
	}
	
	public void task() throws InterruptedException, IOException {
		JavascriptExecutor jse = (JavascriptExecutor)driver;
		driver.findElement(By.xpath("//span[text()='Task']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/task_list.png");
		driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL, Keys.END);
		Thread.sleep(2000);
		jse.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//button[text()='Next']")));
		driver.findElement(By.xpath("//button[text()='Next']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/task_next_list_pagination.png");
		jse.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//button[text()='Previous']")));
		driver.findElement(By.xpath("//button[text()='Previous']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/task_previous_list_pagination.png");
		jse.executeScript("document.querySelector(\".overflow-auto\").scroll(0, -1080);");
		Thread.sleep(1000);
		jse.executeScript("document.querySelector(\".overflow-auto\").scroll(0, -1080);");
		Thread.sleep(1000);
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		driver.findElement(By.xpath("//li[@data-value='Classification']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[2]/div[1]/div[2]/form/div[3]/div/div/div/div/button")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//button[text()='5']")).click();
		driver.findElement(By.xpath("//input[@name='name']")).sendKeys("Space");
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/task_list_filter.png");
		driver.findElement(By.xpath("//button[text()='Detail']")).click();
		Thread.sleep(5000);
		driver.navigate().back();
		Thread.sleep(2000);
		driver.findElement(By.xpath("//input[@name='name']")).sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("(//button[text()='Detail'])[2]")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/task_information.png");
		driver.findElement(By.xpath("//button[text()='Next']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/next_task_information.png");
		driver.findElement(By.xpath("//button[text()='Previous']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/previous_task_information.png");
		driver.findElement(By.xpath("//button[@data-bs-target='#chat-wrapper']")).click();
		Thread.sleep(3000);
		screenshot("./screenshot/hide_chat.png");
		driver.findElement(By.xpath("//button[@data-bs-target='#chat-wrapper']")).click();
		Thread.sleep(2000);
		jse.executeScript("document.querySelector(\".overflow-auto.flex-fill\").scroll(0, -1080);");
		Thread.sleep(3000);
		jse.executeScript("document.querySelector(\".overflow-auto.flex-fill\").scroll(0, 1080);");
		Thread.sleep(3000);
		driver.findElement(By.xpath("//*[local-name()='svg' and @data-testid='ListIcon']/ancestor::button")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/task_data.png");
		driver.findElement(By.xpath("//*[local-name()='svg' and @data-testid='ChevronRightIcon']/ancestor::button")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/next_data.png");
		driver.findElement(By.xpath("//*[local-name()='svg' and @data-testid='ChevronLeftIcon']/ancestor::button[not(@data-bs-toggle='collapse')]")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/previous_data.png");
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//li[text()='Unlabeled']")).click();
		driver.findElement(By.xpath("//input[@name='question']")).sendKeys("App");
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/data_filter.png");
		driver.findElement(By.xpath("//button[text()='Label']")).click();
		Thread.sleep(5000);
		driver.navigate().back();
		Thread.sleep(2000);
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//li[text()='Labeled']")).click();
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//button[text()='Label']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/data_detail.png");
		driver.findElement(By.xpath("//button[text()='Next']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/next_data_detail.png");
		driver.findElement(By.xpath("//button[text()='Previous']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/previous_data_detail.png");
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		Thread.sleep(2000);
		screenshot("./screenshot/data_classification_labelling.png");
		driver.findElement(By.xpath("//li[@role='option']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//button[text()='Save']")).click();
		Thread.sleep(5000);	
		driver.findElement(By.xpath("//span[text()='Task']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//li[@data-value='Summary']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[2]/div[1]/div[2]/form/div[3]/div/div/div/div/button")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//button[text()='5']")).click();
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//button[text()='Detail']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//*[local-name()='svg' and @data-testid='ListIcon']/ancestor::button")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//div[@role='combobox']")).click();
		Thread.sleep(1000);
		driver.findElement(By.xpath("//li[text()='Unlabeled']")).click();
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//button[text()='Label']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//input[@name='input']")).sendKeys("Test labelling");
		driver.findElement(By.xpath("//button[text()='Save']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/data_summary_labelling.png");
		driver.findElement(By.xpath("//input[@name='input']")).sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
		driver.findElement(By.xpath("//button[text()='Save']")).click();
		Thread.sleep(5000);
		screenshot("./screenshot/data_summary_unlabelling.png");
	}
	
	public void wallet() throws InterruptedException, IOException {
		driver.findElement(By.xpath("//span[text()='Wallet']")).click();
		screenshot("./screenshot/wallet.png");
		Thread.sleep(5000);
		driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/div[1]/div/div/div[3]/div[3]/div/div/input")).sendKeys("20000");
		driver.findElement(By.xpath("//button[text()='Draw']")).click();
		screenshot("./screenshot/draw_wallet.png");
	}
	
	public void screenshot(String fileName) throws IOException {
		File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		FileUtils.copyFile(scrFile, new File(fileName));
	}
}
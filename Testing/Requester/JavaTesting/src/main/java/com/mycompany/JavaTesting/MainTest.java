package com.mycompany.JavaTesting;

import io.github.bonigarcia.wdm.WebDriverManager;
import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.TestNG;
import org.testng.xml.XmlClass;
import org.testng.xml.XmlSuite;
import org.testng.xml.XmlTest;

public class MainTest {
    
    public static String website_name = "https://datle-frontend.vercel.app";
    public static void main(String[] args) throws InterruptedException {
        // Initialize TestNG
        TestNG testNG = new TestNG();

        // Create a suite
        XmlSuite suite = new XmlSuite();
        suite.setName("MySuite");
        List<XmlTest> tests = new ArrayList<>();

        // Authentication Test
        XmlTest testAuth = new XmlTest(suite);
        testAuth.setName("AuthTest");
        
        XmlClass testClassAuth = new XmlClass("com.mycompany.JavaTesting.AuthTest");
        List<XmlClass> classesAuth = new ArrayList<>();
        classesAuth.add(testClassAuth);
        testAuth.setXmlClasses(classesAuth);
        
        tests.add(testAuth);
        
        // Navigation Test
        XmlTest testNav = new XmlTest(suite);
        testNav.setName("NavigationTest");
        
        XmlClass testClassNav = new XmlClass("com.mycompany.JavaTesting.NavigationTest");
        List<XmlClass> classesNav = new ArrayList<>();
        classesNav.add(testClassNav);
        testNav.setXmlClasses(classesNav);
        
        tests.add(testNav);
        
        
        
        // Test all
        suite.setTests(tests);
        List<XmlSuite> suites = new ArrayList<>();
        suites.add(suite);
        testNG.setXmlSuites(suites);
        testNG.run();
    }
}
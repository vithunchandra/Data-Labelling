# -*- coding: utf-8 -*-
"""
Created on Tue Dec  5 16:03:18 2023

@author: LVOILA
"""

# test.py
from webdriver_manager.chrome import ChromeDriverManager 
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
import time

HOSTNAME = "http://localhost:5173"

def test_auth_register() :
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install())) 
    
    driver.get(HOSTNAME + '/signin');
    
    signup_link = driver.find_element(By.LINK_TEXT, 'Sign up')
    signup_link.click()
    
    email_input = driver.find_element(By.ID, ':r2:')
    email_input.send_keys('dummy_selenium@example.com')
    
    name_input = driver.find_element(By.ID, ':r3:')
    name_input.send_keys('dummy_account')
    
    password_input = driver.find_element(By.ID, ':r4:')
    password_input.send_keys('dummy_password')
    
    conf_password_input = driver.find_element(By.ID, ':r5:')
    conf_password_input.send_keys('dummy_password')
    
    requester_span = driver.find_element(By.CLASS_NAME, 'MuiTypography-root')
    requester_span.click()
    
    sign_up_button = driver.find_element(By.CSS_SELECTOR,'button.MuiButton-containedPrimary')
    sign_up_button.click()
    
    
    driver.get(HOSTNAME + '/signin');
    
    input_login_email = driver.find_element(By.ID,':r0:')
    input_login_email.send_keys('dummy_selenium@example.com')
    
    input_login_password = driver.find_element(By.ID,':r1:')
    input_login_password.send_keys('dummy_password')
    
    sign_in_button = driver.find_element(By.CSS_SELECTOR,'button.MuiButton-containedPrimary')
    sign_in_button.click()
    time.sleep(1)
    
    current_url = driver.current_url
    assert current_url == (HOSTNAME + "/requester")
    
    
    driver.quit()
    
def test_auth_worker() :
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install())) 
    
    driver.get(HOSTNAME + '/signin');
    
    signup_link = driver.find_element(By.LINK_TEXT, 'Sign up')
    signup_link.click()
    
    email_input = driver.find_element(By.ID, ':r2:')
    email_input.send_keys('dummy_selenium2@example.com')
    
    name_input = driver.find_element(By.ID, ':r3:')
    name_input.send_keys('dummy_account')
    
    password_input = driver.find_element(By.ID, ':r4:')
    password_input.send_keys('dummy_password')
    
    conf_password_input = driver.find_element(By.ID, ':r5:')
    conf_password_input.send_keys('dummy_password')
    
    worker_radio_button = driver.find_element(By.CSS_SELECTOR,'input[name="role"][value="worker"]')
    worker_radio_button.click()
    
    sign_up_button = driver.find_element(By.CSS_SELECTOR,'button.MuiButton-containedPrimary')
    sign_up_button.click()
    
    
    driver.get(HOSTNAME + '/signin');
    
    input_login_email = driver.find_element(By.ID,':r0:')
    input_login_email.send_keys('dummy_selenium2@example.com')
    
    input_login_password = driver.find_element(By.ID,':r1:')
    input_login_password.send_keys('dummy_password')
    
    sign_in_button = driver.find_element(By.CSS_SELECTOR,'button.MuiButton-containedPrimary')
    sign_in_button.click()
    time.sleep(1)
    
    current_url = driver.current_url
    assert current_url == (HOSTNAME + "/worker")
    
    
    driver.quit()

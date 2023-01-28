## Installation

To start this application, fork and clone this repository. Begin by typing  `bundle install`  in the console. Then input the following commands in the console:

-   `rails db:migrate`
-   `rails db:seed`
-   `rails server`

Keep the server running in a separate console session. Type  `npm install`  and  `npm start --prefix client`  in the console to start the application.

Two users are created by default during seeding. Their default logins are: 

**Username**: camp_manager
**Password:** test_password

**Username**: camp_manager
**Password:** test_password

The user can also sign up upon starting the application. However, the user will not be able to conduct distributions, only add/edit new households. 

## Description and Features

![enter image description here](https://im.ezgif.com/tmp/ezgif-1-507d347141.gif)

This application imagines a software for management of an Internally Displaced Persons (IDP) Camp, where the user can conduct cash distributions by depositing funds into a household's (family) account, edit existing households, and add new households and beneficiaries (individual recipients who belong to households).

## Distributions to Households

Upon starting the application and after login, the user can either distribute cash to individual households, or distribute cash to multiple selected households through the check boxes and select all functionality. The default distribution value is 12,000 Iraqi Dinar (IQD -  approximately $8.28 USD) per beneficiary in each household. This mimics current standard World Food Programme distribution amounts in IDP camps across Iraq. The user can change the distribution amount, and there is no maximum or minimum amounts to be distributed. 

When using the select all functionality, only the households that the user is responsible for will be selected. By default, the first 10 households belong to user 1 (camp_manager), and the last 10 households (camp_manager2) belong to user 2 (camp_manager2). Try logging out and logging in under the other user for a demonstration on functionality. New users that are created through the sign up form will see that they are unable to distribute to any of the existing 20 households. However, the new user can choose to create a new household under the new household arrival tab. 

Each set of distributions are grouped under a distribution event, which mimics monthly distributions in IDP camps. By default, the user distributes cash under Distribution 11. Creating a new distribution event will clear account funds, and push any new distributions into Distribution 12. This was done to demonstrate a many-to-many relationship between accounts and distribution events. An account has many distributions, and an account has many distribution events, through those individual distribution transactions, and vice versa. 

## Editing Households

Similar permissions are in place for the edit household tab, in that the user can only edit information among the households they are responsible for. In the edit tab, the user can change the head of household through a dropdown menu of other beneficiaries in the household, edit the address, and edit phone numbers and national ID numbers of individual beneficiaries in the household. The user can also choose to add or remove a beneficiary to the household. Users are not permitted to delete the head of household from the family, and will be prevented from doing so with front-end disabled buttons. If the user wants to delete the head of household, the user must first reassign the head of household position before deleting the beneficiary. The user can also choose to remove the household from the camp, which will delete all associated beneficiaries from the database. 

## New Household Arrival

Users can add a household to the camp, and must first add a beneficiary to begin the process. The same form and component are used to add this first beneficiary to the household as adding a new beneficiary under the edit households tab, but another form field is included to record the address of the household in the camp. Default addresses include a two-digit tent number, followed by a camp sector letter designation. 

Upon form submission, the back-end creates the household, creates the beneficiary to be assigned as the head of the newly-created household, and creates an account to receive distributions. The user is pushed to the edit households tab where the user can add additional household members, as necessary. Newly created households are assigned to the user logged in at the time of creation. 

Validations are present for both adding a beneficiary and household. All fields must exist, the phone number must be a valid 10-digit phone number (excluding the +964- country code), and national ID numbers must be nine characters. 


## ERD
![enter image description here](https://imgtr.ee/images/2023/01/28/G56H2.png)

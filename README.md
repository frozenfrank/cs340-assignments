# Strategy Exercise Designs

> [!NOTE]
> Unfortunately, my diagramming tool is rendering this incorrectly. (I would file a bug report if I had more time.)\
> Specifically, the notes are showing in purple instead of yellow, and the notes do not have the UML folded corner.\
> Please appreciate that I completed the exercise and forgive the UML technicalities.

## Question 1

> A graphical user interface (GUI) library provides a TextBox class that lets the user enter a text value.
> The visual appearance of a TextBox changes depending on whether the text currently in the box is valid or invalid.
> **What constitutes valid text is highly application-specific.**

```mermaid
---
title: Strategy Exercise — TextBox
config:
  class:
    hideEmptyMembersBox: true
---
classDiagram
direction TB

class isValidComparator {
  <<interface>>
  + boolean isValid()
}

TextBox : + TextBox constructor(isValidComparator)
TextBox : - void draw()
TextBox : + onUserInput(newInput)
TextBox --> isValidComparator

isValidComparator <|.. RequiredValidator
isValidComparator <|.. NumericValidator
isValidComparator <|.. PhoneNumberValidator
```

## Question 2

> You want to create an email client class that can be used by programs to send email messages.
> When an email message is sent, sometimes the user needs to provide a login name and password, and other times they do not.
> **When login name and password are required, there are many ways an application might use to obtain this information:**
>   1. A console application might prompt the user in the console and ask them to enter their login name and password. Or, it might let the user specify their login name and password as command-line parameters.
>   2. A graphical application might display a dialog that prompts the user for their login name and password
>   3. An application might have a configuration file in which the user can specify their login name and password.


```mermaid
---
title: Strategy Exercise — Email Client
config:
  class:
    hideEmptyMembersBox: true
---
classDiagram
direction RL

class GetLoginCredentialsStrategy {
  <<interface>>
  + Promise<void> init()
  + string getUsername()
  + string getPassword()
  + Promise<void> deinit()
}

EmailClient : + EmailClient constructor(GetLoginCredentialsStrategy)
EmailClient : + sendEmail(EmailDetails)
EmailClient --> GetLoginCredentialsStrategy
note for EmailClient "sendEmail() {<br>...<br> if(needsCredentials) {<br> // call all methods on credentials strategy<br>}<br>...<br>}"

ConsoleCredentialsImpl ..|> GetLoginCredentialsStrategy
GraphicalCredentialsImpl ..|> GetLoginCredentialsStrategy
ConfigFileImpl ..|> GetLoginCredentialsStrategy

note for ConsoleCredentialsImpl "Noops for init() and deinit(). Start repl on get*() methods"
note for GraphicalCredentialsImpl "Open dialog box on init() and await valid inputs. Close dialog on deinit()"
note for ConfigFileImpl "Load file on init() and close file on deinit()"
```

## Question 3

> E-commerce applications need to process online customer orders.
> The basic process for processing an order is the same for all applications, and includes steps like calculating sales tax, taking payment, and shipping the order.
> **However, each of these steps will be somewhat different for each application:**
>   1. The algorithm for calculating sales tax will depend on the laws of the state and/or country in which the software is deployed
>   1. There are many different ways that a customer can pay: credit card, debit card, PayPal, etc.
>   1. There are many different shipping options: FedEx, US Postal Service, DHL, etc.


```mermaid
---
title: Strategy Exercise — E-commerce Payment
config:
  class:
    hideEmptyMembersBox: true
---
classDiagram
direction TB

class SalesTaxStrategy {
  <<interface>>
  + number calculate(orderTotal)
}

class PaymentMethodStrategy {
  <<interface>>
  + void collectDetails(Order)
  + void pay(orderTotal)
}

class ShippingMethodStrategy {
  <<interface>>
  + void collectDetails(Order)
  + void ship(orderTotal)
}

PaymentProcessor : + PaymentProcessor constructor(SalesTaxStrategy, PaymentMethodStrategy, ShippingMethodStrategy)
PaymentProcessor : + prepareOrder(Order)
PaymentProcessor : + processOrder(Order)
PaymentProcessor --> SalesTaxStrategy
PaymentProcessor --> PaymentMethodStrategy
PaymentProcessor --> ShippingMethodStrategy
note for PaymentProcessor "prepareOrder() {<br>// Calls collectDetails() on payment and shipping strategies <br>}"
note for PaymentProcessor "processorder() {<br>...<br> payment.pay()<br> shipping.ship()<br>... <br>}"

SalesTaxStrategy <|.. NoSalesTaxStrategy
SalesTaxStrategy <|.. UtahSalesTaxStrategy
SalesTaxStrategy <|.. CaliforniaSalesTaxStrategy

ShippingMethodStrategy <|.. AmazonShippingStrategy
ShippingMethodStrategy <|.. SantaShippingStrategy

PaymentMethodStrategy <|.. CheckPaymentStrategy
PaymentMethodStrategy <|.. CreditCardPaymentStrategy
PaymentMethodStrategy <|.. PayLaterStrategy
```

## Question 4

> Many video games implement “AI” (artificial intelligence) players that make it possible for human players to play against the computer.
> **An AI player might use different strategies in deciding what moves it wants to make.**
> An AI player might even use multiple strategies in combination.
> Over time, we will probably think of new strategies that AI players can use to select their moves.


```mermaid
---
title: Strategy Exercise — AI
config:
  class:
    hideEmptyMembersBox: true
---
classDiagram
direction TB

class AiStrategy {
  <<interface>>
  + void kick()
  + void punch()
  + void duck()
}

AiPlayer : + AiPlayer constructor(AiStrategy)
AiPlayer : + onUserInput(newInput)
AiPlayer --> AiStrategy

AiStrategy <|.. StrongManStrategy
AiStrategy <|.. FastManStrategy
AiStrategy <|.. ComboManStrategy

AiStrategy *-- ComboManStrategy

note for StrongManStrategy "Deal heavy damage,<br> but duck slow"
note for FastManStrategy "Doge with high probability,<br> but deal low damage"
note for ComboManStrategy "Combine abilities from other<br> strategy patterns"
```

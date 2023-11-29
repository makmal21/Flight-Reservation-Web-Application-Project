DROP DATABASE IF EXISTS AIRLINE;
CREATE DATABASE AIRLINE;
USE AIRLINE;


-- Create STUDENT Table
DROP TABLE IF EXISTS STUDENT;
CREATE TABLE STUDENT (
  ID int NOT NULL ,
  FName VARCHAR(20) ,
  Email VARCHAR(100) ,
  PRIMARY KEY (ID)  
);
INSERT INTO STUDENT (ID, FName, Email) VALUES 
('2585', 'Laura', 'Laura@gmail.com'),
('2534', 'Sam', 'sam@gmail.com') ;

-- Create Flight Table
DROP TABLE IF EXISTS Flight;
CREATE TABLE Flight (
  FlightID int NOT NULL AUTO_INCREMENT COMMENT 'Primary key of activity. Should auto increment.',
  Origin VARCHAR(20) COMMENT 'Origin of flight.',
  Destination VARCHAR(20) COMMENT 'Destination of flight.',
  DestinationDate date,
  Price Integer,
  PRIMARY KEY (FlightID)  
);

INSERT INTO Flight (Origin, Destination, DestinationDate, Price) VALUES
('Calgary', 'Vancouver', '2023-12-01', 500),
('Vancouver', 'Toronto', '2023-12-03',  510),
('Montreal', 'Calgary', '2023-12-05',  400),
('Calgary', 'Montreal', '2023-12-07', 420),
('Edmonton', 'Ottawa', '2023-12-09', 350),
('Ottawa', 'Edmonton', '2023-12-11', 360),
('Halifax', 'Winnipeg', '2023-12-13', 450),
('Calgary', 'Vancouver', '2023-12-01', 1000),
('Toronto', 'Vancouver', '2023-12-01', 1000),
('Winnipeg', 'Halifax', '2023-12-15', 460);
/*('Calgary', 'Vancouver', '2023-12-01', 530),
('Calgary', 'Vancouver', '2023-12-01', 800),
('Calgary', 'Vancouver', '2023-12-01', 340),
('Calgary', 'Vancouver', '2023-12-01', 230);*/

INSERT INTO Flight (Origin, Destination, DestinationDate, Price) VALUES
('Taylorview', 'New Willie', '2023-12-18', 553),
('Sydneyview', 'Michelleside', '2023-12-09', 342),
('West George', 'Stevenshaven', '2023-12-14', 392),
('Haaschester', 'Kaylastad', '2023-11-25', 395),
('Lake Dustinmouth', 'Colemanberg', '2023-11-23', 451),
('Annemouth', 'Kellyport', '2023-12-15', 586),
('South Jared', 'East Jody', '2023-12-03', 345),
('Scottview', 'Port Madison', '2023-11-30', 438),
('Phamville', 'West Aaron', '2023-12-14', 567),
('Hernandezstad', 'Port Tammy', '2023-12-02', 364),
('Heatherchester', 'Barnesborough', '2023-12-15', 452),
('Osbornemouth', 'Alexanderview', '2023-12-08', 574),
('Port Jonathan', 'New Jamesville', '2023-12-10', 307),
('Jensenville', 'Evansfort', '2023-12-02', 546),
('South Justin', 'Nelsonstad', '2023-12-15', 387),
('Matthewsburgh', 'Vanessaborough', '2023-12-18', 511),
('Cabrerafort', 'Lake Jeanetteton', '2023-11-27', 370),
('Smithburgh', 'Port Stevenhaven', '2023-12-05', 576),
('Bryanhaven', 'Brianberg', '2023-12-06', 578),
('Lake Jennifer', 'Brianhaven', '2023-12-04', 600),
('Underwoodport', 'Lake Patricia', '2023-12-05', 350),
('New Caleb', 'Johnsontown', '2023-12-16', 398),
('Port Jonathanfort', 'North John', '2023-12-15', 495),
('Herringmouth', 'North Michael', '2023-12-18', 482),
('Port Douglasbury', 'West Roberta', '2023-12-03', 336),
('Markside', 'West Stephanieburgh', '2023-11-25', 448),
('North Angela', 'North Robertville', '2023-12-09', 598),
('Markmouth', 'Port Lisa', '2023-12-19', 343),
('Rhondamouth', 'Lake Kara', '2023-12-18', 381),
('New Samantha', 'South Williamstad', '2023-11-28', 595);

-- Create Seat Table
DROP TABLE IF EXISTS Seat;
CREATE TABLE Seat (
  SeatID VARCHAR(20) NOT NULL,
  SeatNo VARCHAR(20) COMMENT 'Seat number in flight',
  Type VARCHAR(20) COMMENT 'Ordinary, Comfort, Business Class ',
  Status VARCHAR(20) COMMENT 'Available, Unavailable',
  Price INTEGER GENERATED ALWAYS AS (
    CASE
      WHEN Type = 'Ordinary' THEN 30
      WHEN Type = 'Comfort' THEN 1.4 * 30  -- 40% more than Ordinary
      WHEN Type = 'Business Class' THEN 2 * 30  -- Double the Ordinary
      ELSE NULL
    END
  ) STORED,
  FlightID INTEGER AUTO_INCREMENT, 
  PRIMARY KEY (SeatID),
  FOREIGN KEY (FlightID) REFERENCES FLIGHT(FlightID)
);
-- need to add logic so price associates with seat type 
INSERT INTO Seat (SeatID, SeatNo, Type, Status) VALUES
('85f8667e-c', '39S', 'Comfort', 'Unavailable'),
('96e1d19d-4', '20Q', 'Ordinary', 'Unavailable'),
('c536d8c8-7', '11G', 'Ordinary', 'Unavailable'),
('647abf05-0', '7R', 'Business Class', 'Available'),
('a977311a-7', '45G', 'Comfort', 'Available'),
('ee7bf488-e', '31V', 'Comfort', 'Available'),
('dc55eb42-0', '15L', 'Ordinary', 'Unavailable'),
('6c9c4c85-0', '40X', 'Business Class', 'Available'),
('ac942807-8', '27Q', 'Ordinary', 'Available'),
('5dd61f55-3', '27G', 'Business Class', 'Unavailable'),
('98c6d610-1', '14D', 'Ordinary', 'Available'),
('74a1ca2f-e', '10Q', 'Business Class', 'Unavailable'),
('171a22e3-c', '26L', 'Ordinary', 'Available'),
('ab1ebc23-b', '43Z', 'Business Class', 'Available'),
('ab10fccf-f', '42R', 'Ordinary', 'Available'),
('756d1b07-8', '19P', 'Ordinary', 'Unavailable'),
('1aae4ced-9', '7J', 'Ordinary', 'Available'),
('050b09bf-c', '12A', 'Business Class', 'Available'),
('ec7865ca-6', '20Z', 'Comfort', 'Available'),
('93b95dd8-1', '13J', 'Business Class', 'Unavailable'),
('b2793ce6-6', '5V', 'Comfort', 'Available'),
('acf9375d-4', '49X', 'Ordinary', 'Available'),
('146db653-b', '35P', 'Ordinary', 'Unavailable'),
('1cf34ff5-b', '24Q', 'Comfort', 'Unavailable'),
('861dfe5f-d', '15H', 'Comfort', 'Unavailable'),
('b9be886f-9', '6T', 'Ordinary', 'Available'),
('42e17a29-7', '49C', 'Ordinary', 'Unavailable'),
('486b30fe-1', '25H', 'Ordinary', 'Available'),
('cba55c06-2', '44V', 'Comfort', 'Unavailable'),
('0778072a-c', '36L', 'Business Class', 'Available');

-- Create Payment Table
DROP TABLE IF EXISTS Payment;
CREATE TABLE Payment (
  PaymentID VARCHAR(20) NOT NULL COMMENT 'Primary key of activity. ',
  Amount INTEGER COMMENT 'total cost paid', -- need to figure out how to make this a sum of the price in other two columns
  PRIMARY KEY (PaymentID)
);
INSERT INTO Payment (PaymentID, Amount) VALUES
('c72f80', 288),
('953efd', 323),
('35761a', 169),
('56edd2', 252),
('dc8911', 419),
('f74955', 410),
('fcf29a', 172),
('ceecd7', 344),
('dd6c37', 441),
('e5a8fa', 128),
('cfe942', 203),
('b0f491', 229),
('ed9b4f', 239),
('e8dcb9', 243),
('7a218b', 408),
('dd080f', 104),
('0d4aa4', 488),
('ddfa57', 288),
('6d4305', 455),
('76a20f', 323),
('846531', 401),
('6e17a0', 408),
('02ea11', 250),
('775ee6', 405),
('e1db7d', 238),
('1fd3ee', 208),
('148482', 417),
('1ef47a', 321),
('2f82b8', 456),
('38408f', 315);


-- Create User Table for Resgistered user and Airline Staff
DROP TABLE IF EXISTS User;
CREATE TABLE User (
  Email VARCHAR(50) NOT NULL,
  Password VARCHAR(20),
  StaffFlag VARCHAR(1) COMMENT 'Y OR N',
  PRIMARY KEY (Email)
);
INSERT INTO User (Email, Password, StaffFlag) VALUES
('rgordon@example.net', '&58r8#Fc_x', 'N'),
('rjacobson@example.com', 'CXVhd9Xb^s', 'N'),
('martinnewton@example.net', 'S*P0U%mt^8', 'Y'),
('dakotavincent@example.org', ')WjUo$jb83', 'Y'),
('bjones@example.org', 'p)e^Z0Hxi1', 'Y'),
('valerie93@example.com', '5(0jXb6TDr', 'N'),
('leejohn@example.com', '2$T(RizJ+N', 'Y'),
('donald13@example.com', '(doFc)zr9a', 'N'),
('landerson@example.com', '+3VU*foydA', 'N'),
('jonesjoshua@example.org', '25HPAhYj#5', 'N'),
('kimberlyking@example.net', 'F#rf5HHK!r', 'Y'),
('fyoung@example.org', 'su)MIOWH@9', 'N'),
('yolanda06@example.com', '&%9v)QeMg1', 'N'),
('lisa10@example.org', '%b5H3qY2B*', 'Y'),
('daniel69@example.com', '&9KGqhbk4X', 'Y'),
('nancyfloyd@example.com', '!^2FsYAe(o', 'Y'),
('peter01@example.net', '!RhXdPz*5%', 'Y'),
('nataliecline@example.org', 'tn3HTHjRq*', 'Y'),
('gjones@example.com', '$uz8cOBgD$', 'Y'),
('livingstonrhonda@example.org', '8%k36Wbyf8', 'N'),
('combsjennifer@example.org', '1_HiFG+x^w', 'N'),
('stephanienewton@example.net', '!h!iN!QZ$2', 'Y'),
('mfrazier@example.net', '*45KjyYz@W', 'Y'),
('greenmanuel@example.org', '(^8rO5i(tF', 'N'),
('campbellbrandon@example.net', 'iP9JI7xVL&', 'N'),
('uwilliams@example.org', 'a@g6D6_Orl', 'Y'),
('butlersally@example.org', '+A0Y7UrQj&', 'Y'),
('patriciaruiz@example.net', '(7LVrk@k!l', 'Y'),
('johnsonpeter@example.com', '3mNJsJjo@8', 'Y'),
('doughertykristen@example.org', 'b^*9#Nr$#%', 'N');

-- Create Ticket Table
DROP TABLE IF EXISTS Ticket;
CREATE TABLE Ticket (
  TicketID VARCHAR(20),
  Name VARCHAR(20) COMMENT 'Name of passenger',
  Email VARCHAR(50) COMMENT 'Email of passenger',
  FlightID INTEGER,
  PaymentID VARCHAR(20),
  SeatID VARCHAR(20), 
  -- TotalCost VARCHAR(20), -- I don't think we need this -> this can come from the payment table hence "Payment ID"
  PRIMARY KEY (TicketID), 
  FOREIGN KEY (FlightID) REFERENCES FLIGHT(FlightID),
  FOREIGN KEY (PaymentID) REFERENCES PAYMENT(PaymentID),
  FOREIGN KEY (SeatID) REFERENCES SEAT(SeatID)
);

INSERT INTO Ticket (TicketID, Name, Email, FlightID, PaymentID, SeatID) VALUES
('o5pllb', 'Brandon Campbell', 'campbellbrandon@example.net', 23, '0d4aa4', '146db653-b'),
('6wftsi', 'Jennifer Combs', 'combsjennifer@example.org', 24, 'ed9b4f', '1cf34ff5-b'),
('2aobyz', 'Donald Trump', 'donald13@example.com', 27, '148482', '42e17a29-7'),
('fvsoti', 'Kristen Dougherty', 'doughertykristen@example.org', 10, '02ea11', '5dd61f55-3'),
('na6etk', 'Francis Young', 'fyoung@example.org', 12, '6d4305', '74a1ca2f-e'),
('joer0v', 'Manuel Green', 'greenmanuel@example.org', 16, 'ceecd7', '756d1b07-8'),
('mubu6e', 'Joshua Jones', 'jonesjoshua@example.org', 1, 'e5a8fa', '85f8667e-c'),
('ohmynu', 'Lonnie Anderson', 'landerson@example.com', 25, 'c72f80', '861dfe5f-d'),
('1b3f8x', 'Rhonda Livingston', 'livingstonrhonda@example.org', 20, '1fd3ee', '93b95dd8-1'),
('2ibrzw', 'Ryan Gordon', 'rgordon@example.net', 2, 'cfe942', '96e1d19d-4'),
('qtq1da', 'Ronald Jacobson', 'rjacobson@example.com', 3, 'dd6c37', 'c536d8c8-7'),
('rpia6h', 'Valerie Fan', 'valerie93@example.com', 29, '38408f', 'cba55c06-2'),
('ywr2sz', 'Yoland Deez', 'yolanda06@example.com', 7, '953efd', 'dc55eb42-0');



ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

-- Insert the sum of other two price columns
/*SELECT Flight.Price + Seat.Price
FROM Flight
JOIN Seat ON Flight.FlightID = Seat.FlightID;*/

-- ('o5pllb', 'Brandon Campbell', 'campbellbrandon@example.net', 23, '0d4aa4', '146db653-b'),


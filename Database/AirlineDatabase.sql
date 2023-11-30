DROP DATABASE IF EXISTS AIRLINE;
CREATE DATABASE AIRLINE;
USE AIRLINE;


-- Create Flight Table
DROP TABLE IF EXISTS Flight;
CREATE TABLE Flight (
  FlightID int NOT NULL AUTO_INCREMENT COMMENT 'Primary key of activity. Should auto increment.',
  Origin VARCHAR(20) COMMENT 'Origin of flight.',
  Destination VARCHAR(20) COMMENT 'Destination of flight.',
  DepartureDate DATETIME,
  Price Integer,
  PRIMARY KEY (FlightID)  
);

-- change destinationDate to departuredate : will need to update code as well
INSERT INTO Flight (Origin, Destination, DepartureDate, Price) VALUES
  ('Calgary', 'Vancouver', '2023-12-01 12:00:00', 500),
  ('Vancouver', 'Toronto', '2023-12-03 14:30:00', 510),
  ('Montreal', 'Calgary', '2023-12-05 08:45:00', 400),
  ('Calgary', 'Montreal', '2023-12-07 16:20:00', 420),
  ('Edmonton', 'Ottawa', '2023-12-09 10:15:00', 350),
  ('Ottawa', 'Edmonton', '2023-12-11 13:45:00', 360),
  ('Halifax', 'Winnipeg', '2023-12-13 18:30:00', 450),
  ('Calgary', 'Vancouver', '2023-12-11 20:00:00', 1000),
  ('Toronto', 'Vancouver', '2023-12-11 21:15:00', 1000),
  ('Winnipeg', 'Halifax', '2023-12-15 11:00:00', 460),
  ('Calgary', 'Vancouver', '2023-12-07 14:30:00', 1000),
  ('Calgary', 'Vancouver', '2023-12-09 16:45:00', 1000),
  ('Calgary', 'Vancouver', '2023-12-10 09:30:00', 1000),
  ('Calgary', 'Vancouver', '2023-12-12 19:00:00', 1000);


INSERT INTO Flight (Origin, Destination, DepartureDate, Price) VALUES
('Calgary', 'Vancouver', '2023-12-18 12:00:00', 553),
('Toronto', 'Los Angeles', '2023-12-09 14:30:00', 342),
('Montreal', 'San Francisco', '2023-12-14 08:45:00', 392),
('Vancouver', 'Chicago', '2023-11-25 16:20:00', 395),
('Calgary', 'Ottawa', '2023-11-23 10:15:00', 451),
('Calgary', 'San Francisco', '2023-12-15 18:30:00', 586),
('Winnipeg', 'Halifax', '2023-12-03 20:00:00', 345),
('Los Angeles', 'Vancouver', '2023-11-30 21:15:00', 438),
('Calgary', 'Toronto', '2023-12-14 09:30:00', 567),
('Winnipeg', 'Halifax', '2023-12-02 11:00:00', 364),
('Montreal', 'Vancouver', '2023-12-15 14:30:00', 452),
('Calgary', 'Vancouver', '2023-12-08 16:45:00', 574),
('Toronto', 'Vancouver', '2023-12-10 19:30:00', 307),
('Calgary', 'San Francisco', '2023-12-12 09:00:00', 546),
('Calgary', 'New York', '2023-12-15 11:45:00', 387),
('Calgary', 'Los Angeles', '2023-12-18 08:30:00', 511),
('Vancouver', 'Toronto', '2023-11-27 14:15:00', 370),
('Ottawa', 'Calgary', '2023-12-05 22:00:00', 576),
('Calgary', 'Vancouver', '2023-12-06 13:15:00', 578),
('Calgary', 'Vancouver', '2023-12-04 07:30:00', 600),
('Calgary', 'Vancouver', '2023-12-05 18:45:00', 350),
('Halifax', 'Vancouver', '2023-12-16 10:30:00', 398),
('Winnipeg', 'Vancouver', '2023-12-15 12:15:00', 495),
('Toronto', 'Vancouver', '2023-12-18 16:00:00', 482),
('Vancouver', 'Calgary', '2023-12-03 09:45:00', 336),
('Vancouver', 'Montreal', '2023-11-25 11:30:00', 448),
('Vancouver', 'Toronto', '2023-12-09 14:15:00', 598),
('Halifax', 'Calgary', '2023-12-19 16:30:00', 343),
('Los Angeles', 'Calgary', '2023-12-18 20:45:00', 381),
('Calgary', 'Toronto', '2023-11-28 22:00:00', 595);

-- Create Seat Table
DROP TABLE IF EXISTS Seat;
CREATE TABLE Seat (
  SeatID VARCHAR(20) NOT NULL,
  SeatNo VARCHAR(20) COMMENT 'Seat number in flight',
  Type VARCHAR(20) COMMENT 'Ordinary, Comfort, Business Class ',
  Status VARCHAR(20) COMMENT 'Available, Unavailable',
  Price DECIMAL(10, 2) GENERATED ALWAYS AS (
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



-- eveything is avliable so that way once its picked it can be changed to unavaible ? 
INSERT INTO Seat (SeatID, SeatNo, Type, Status, FlightID) VALUES
('1AAA', '1', 'Business Class', 'Available', 1),
('1AAB', '2', 'Business Class', 'Available', 1),
('1AAC', '3', 'Business Class', 'Available', 1),
('1AAD', '4', 'Business Class', 'Available', 1),
('1AAE', '5', 'Comfort', 'Available', 1),
('1AAF', '6', 'Comfort', 'Available', 1),
('1AAG', '7', 'Comfort', 'Available', 1),
('1AAH', '8', 'Comfort', 'Available', 1),
('1AAI', '9', 'Comfort', 'Available', 1),
('1AAJ', '10', 'Comfort', 'Available', 1),
('1AAK', '11', 'Ordinary', 'Available', 1),
('1AAL', '12', 'Ordinary', 'Available', 1),
('1AAM', '13', 'Ordinary', 'Available', 1),
('1AAN', '14', 'Ordinary', 'Available', 1),
('1AAO', '15', 'Ordinary', 'Available', 1),
('1AAP', '16', 'Ordinary', 'Available', 1),
('1AAQ', '17', 'Ordinary', 'Available', 1),
('1AAR', '18', 'Ordinary', 'Available', 1),
('1AAS', '19', 'Ordinary', 'Available', 1),
('1AAT', '20', 'Ordinary', 'Available', 1),
('1AAU', '21', 'Business Class', 'Available', 1),
('1AAV', '22', 'Business Class', 'Available', 1),
('1AAW', '23', 'Business Class', 'Available', 1),
('1AAX', '24', 'Business Class', 'Available', 1),
('1AAY', '25', 'Comfort', 'Available', 1),
('1AAZ', '26', 'Comfort', 'Available', 1),
('2AAA', '27', 'Comfort', 'Available', 1),
('2AAB', '28', 'Comfort', 'Available', 1),
('2AAC', '29', 'Comfort', 'Available', 1),
('2AAD', '30', 'Comfort', 'Available', 1),
('2AAE', '31', 'Ordinary', 'Available', 1),
('2AAF', '32', 'Ordinary', 'Available', 1),
('2AAG', '33', 'Ordinary', 'Available', 1),
('2AAH', '34', 'Ordinary', 'Available', 1),
('2AAI', '35', 'Ordinary', 'Available', 1),
('2AAJ', '36', 'Ordinary', 'Available', 1),
('2AAK', '37', 'Ordinary', 'Available', 1),
('2AAL', '38', 'Ordinary', 'Available', 1),
('2AAM', '39', 'Ordinary', 'Available', 1),
('2AAN', '40', 'Ordinary', 'Available', 1);

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
  StaffFlag BOOLEAN COMMENT '1 for User is a staff OR 0 for User is not a staff',
  PRIMARY KEY (Email)
);
INSERT INTO User (Email, Password, StaffFlag) VALUES
('rgordon@gmail.com', '&58r8#Fc_x', 0),
('rjacob@hotmail.com', 'CXVhd9Xb^s', 0),
('mnewton@gmail.com', 'S*P0U%mt^8', 1),
('dvincent@hotmail.com', ')WjUo$jb83', 1),
('bjones@hotmail.com', 'p)e^Z0Hxi1', 1),
('valerie93@gmail.com', '5(0jXb6TDr', 0),
('leejohn@gmail.com', '2$T(RizJ+N', 1),
('don13@gmail.com', '(doFc)zr9a', 0),
('landerson@gmail.com', '+3VU*foydA', 0),
('jjones@hotmail.com', '25HPAhYj#5', 0),
('kking@gmail.com', 'F#rf5HHK!r', 1),
('fyoung@hotmail.com', 'su)MIOWH@9', 0),
('yolanda06@gmail.com', '&%9v)QeMg1', 0),
('lisa10@hotmail.com', '%b5H3qY2B*', 1),
('daniel69@gmail.com', '&9KGqhbk4X', 1),
('nfloyd@gmail.com', '!^2FsYAe(o', 1),
('peter01@gmail.com', '!RhXdPz*5%', 1),
('ncline@hotmail.com', 'tn3HTHjRq*', 1),
('gjones@gmail.com', '$uz8cOBgD$', 1),
('lrhonda@hotmail.com', '8%k36Wbyf8', 0),
('jcombs@hotmail.com', '1_HiFG+x^w', 0),
('snewton@gmail.com', '!h!iN!QZ$2', 1),
('mfrazier@gmail.com', '*45KjyYz@W', 1),
('manuel@hotmail.com', '(^8rO5i(tF', 0),
('bcampbell@gmail.com', 'iP9JI7xVL&', 0),
('uwilliams@hotmail.com', 'a@g6D6_Orl', 1),
('sbutler@hotmail.com', '+A0Y7UrQj&', 1),
('patricia@gmail.com', '(7LVrk@k!l', 1),
('johnpeter@hotmail.com', '3mNJsJjo@8', 1),
('dkristen@hotmail.com', 'b^*9#Nr$#%', 0);

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
('o5pllb', 'Brandon Campbell', 'campbellbrandon@example.net', 23, '0d4aa4', '1AAA'),
('6wftsi', 'Jennifer Combs', 'combsjennifer@example.org', 24, 'ed9b4f', '1AAG'),
('2aobyz', 'Donald Trump', 'donald13@example.com', 27, '148482', '1AAJ'),
('fvsoti', 'Kristen Dougherty', 'doughertykristen@example.org', 10, '02ea11', '1AAR'),
('na6etk', 'Francis Young', 'fyoung@example.org', 12, '6d4305', '2AAB'),
('joer0v', 'Manuel Green', 'greenmanuel@example.org', 16, 'ceecd7', '1AAY'),
('mubu6e', 'Joshua Jones', 'jonesjoshua@example.org', 1, 'e5a8fa', '2AAM'),
('ohmynu', 'Lonnie Anderson', 'landerson@example.com', 25, 'c72f80', '1AAH'),
('1b3f8x', 'Rhonda Livingston', 'livingstonrhonda@example.org', 20, '1fd3ee', '1AAQ'),
('2ibrzw', 'Ryan Gordon', 'rgordon@example.net', 2, 'cfe942', '1AAS'),
('qtq1da', 'Ronald Jacobson', 'rjacobson@example.com', 3, 'dd6c37', '2AAD'),
('rpia6h', 'Valerie Fan', 'valerie93@example.com', 29, '38408f', '2AAE'),
('ywr2sz', 'Yoland Deez', 'yolanda06@example.com', 7, '953efd', '1AAU');

-- SYSTEM ADMIN ACCESS TABLES 

DROP TABLE IF EXISTS Crew;
CREATE TABLE Crew (
  CrewID VARCHAR(10) NOT NULL,
  Name VARCHAR(50),
  Role VARCHAR(25) COMMENT 'Pilot, Co-pilot, Flight Attendant', 
  FlightID INTEGER COMMENT 'Flight crew assigned',
  FOREIGN KEY (FlightID) REFERENCES FLIGHT(FlightID)
);
INSERT INTO Crew (CrewID, Name, Role, FlightID) VALUES
('C001', 'John Smith', 'Pilot', 1),
('C002', 'Emily Johnson', 'Pilot', 2),
('C003', 'Michael Davis', 'Co-pilot', 1),
('C004', 'Sara Miller', 'Co-pilot', 2),
('C005', 'David White', 'Flight Attendant', 1),
('C006', 'Jessica Lee', 'Flight Attendant', 1),
('C007', 'Brian Wilson', 'Flight Attendant', 1),
('C008', 'Linda Brown', 'Flight Attendant', 1),
('C009', 'Alex Turner', 'Flight Attendant', 2),
('C010', 'Sophia Garcia', 'Flight Attendant', 2),
('C011', 'Ella Johnson', 'Flight Attendant', 2),
('C012', 'James Anderson', 'Flight Attendant', 2);

CREATE TABLE Aircraft (
  AircraftID VARCHAR(10) NOT NULL,
  Model VARCHAR(50) COMMENT 'Bombardier CRJ Series,De Havilland Canada DHC-8 Dash 8', 
  Capacity INTEGER COMMENT '40 Seats',
  FlightID INTEGER COMMENT 'aircraft assigned for flight - constantly updated by system admin',
  PRIMARY KEY (AircraftID),
  FOREIGN KEY (FlightID) REFERENCES FLIGHT(FlightID)
);

INSERT INTO Aircraft (AircraftID, Model, Capacity, FlightID)
VALUES 
('A001', 'Bombardier CRJ Series', 40, 1),
('A002', 'De Havilland Canada DHC-8 Dash 8', 40, 2);



-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-- flush privileges;

-- Insert the sum of other two price columns
/*SELECT Flight.Price + Seat.Price
FROM Flight
JOIN Seat ON Flight.FlightID = Seat.FlightID;*/



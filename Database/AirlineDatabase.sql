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
  FlightID INTEGER,
  Price DECIMAL(10, 2) GENERATED ALWAYS AS (
    CASE
      WHEN Type = 'Ordinary' THEN 30
      WHEN Type = 'Comfort' THEN 1.4 * 30  -- 40% more than Ordinary
      WHEN Type = 'Business Class' THEN 2 * 30  -- Double the Ordinary
      ELSE NULL
    END
  ) STORED,
  PRIMARY KEY (SeatID), 
  FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)
);


INSERT INTO Seat (SeatID, SeatNo, Type, Status, FlightID) VALUES
('1AAA', '1', 'Business Class', 'Unavailable',1),
('1AAB', '2', 'Comfort', 'Unavailable',1),
('1AAC', '3', 'Ordinary', 'Unavailable', 1),
('1BAA', '1', 'Business Class', 'Unavailable',2),
('1BAB', '2', 'Comfort', 'Unavailable',2),
('1BAC', '3', 'Ordinary', 'Unavailable', 2),
('1CAA', '1', 'Business Class', 'Unavailable',3),
('1CAB', '2', 'Comfort', 'Unavailable',3),
('1CAC', '3', 'Ordinary', 'Unavailable', 3),
('1DAA', '1', 'Business Class', 'Unavailable',4),
('1DAB', '2', 'Comfort', 'Unavailable',4),
('1DAC', '3', 'Ordinary', 'Unavailable', 4);

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
('b0f491', 229);

-- Create User Table for Resgistered user and Airline Staff
DROP TABLE IF EXISTS User;
CREATE TABLE User (
  Email VARCHAR(50) NOT NULL,
  Password VARCHAR(20),
  StaffFlag BOOLEAN COMMENT '1 for User is a staff OR 0 for User is not a staff',
  PRIMARY KEY (Email)
);
INSERT INTO User (Email, Password, StaffFlag) VALUES
('staff@gmail.com','S*P0U%mt8', 1),
('admin@hotmail.com', 'CXVhd9Xb!s', 2);

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
  FOREIGN KEY (FlightID) REFERENCES Flight(FlightID),
  FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID),
  FOREIGN KEY (SeatID) REFERENCES Seat(SeatID)
);

INSERT INTO Ticket (TicketID, Name, Email, FlightID, PaymentID, SeatID) VALUES
('o5pllb', 'Brandon Campbell', 'campbellbrandon@example.net', 23, 'c72f80', '1AAA'),
('6wftsi', 'Jennifer Combs', 'combsjennifer@example.org', 24, '953efd', '1AAB'),
('2aobyz', 'Donald Trump', 'donald13@example.com', 27, '35761a', '1AAC'),
('fvsoti', 'Kristen Dougherty', 'doughertykristen@example.org', 10, '56edd2', '1BAA'),
('na6etk', 'Francis Young', 'fyoung@example.org', 12, 'dc8911', '1BAB'),
('joer0v', 'Manuel Green', 'greenmanuel@example.org', 16, 'f74955', '1BAC'),
('mubu6e', 'Joshua Jones', 'jonesjoshua@example.org', 1, 'fcf29a', '1CAA'),
('ohmynu', 'Lonnie Anderson', 'landerson@example.com', 25, 'ceecd7', '1CAB'),
('1b3f8x', 'Rhonda Livingston', 'livingstonrhonda@example.org', 20, 'dd6c37', '1CAC'),
('2ibrzw', 'Ryan Gordon', 'rgordon@example.net', 2, 'e5a8fa', '1DAA'),
('qtq1da', 'Ronald Jacobson', 'rjacobson@example.com', 3, 'cfe942', '1DAB'),
('rpia6h', 'Valerie Fan', 'valerie93@example.com', 29, 'b0f491', '1DAC');

-- SYSTEM ADMIN ACCESS TABLES 

DROP TABLE IF EXISTS Crew;
CREATE TABLE Crew (
  CrewID VARCHAR(10) NOT NULL,
  Name VARCHAR(50),
  Role VARCHAR(25) COMMENT 'Pilot, Co-pilot, Flight Attendant', 
  FlightID INTEGER COMMENT 'Flight crew assigned',
  FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)
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
  FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)
);

INSERT INTO Aircraft (AircraftID, Model, Capacity, FlightID)
VALUES 
('A001', 'Bombardier CRJ Series', 40, 1),
('A002', 'De Havilland Canada DHC-8 Dash 8', 40, 2),
('A003', 'Bombardier CRJ Series', 40, 3),
('A004', 'De Havilland Canada DHC-8 Dash 8', 40, 4);



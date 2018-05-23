create database NirProject
--on(name='NirProject_Data',
--fileName='C:\Users\Etty_chuch\Desktop\NirProject\NirProject_data.mdf',
--size=10,
--fileGrowth=30%)
--log on (name='NirProject_Data',
--fileName='C:\Users\Etty_chuch\Desktop\NirProject\NirProject_log.ldf',
--size=10,
--fileGrowth=30%)
--collate hebrew_CI_AS
go

use NirProject
go

create table Catagory(
CatagoryID int not null identity(1,1) primary key,
CatagoryName nvarchar(100))
go

create table Items(
ItemID int not null identity(1,1) primary key,
price money,
ItemName nvarchar(50),
ItemImg image,
ItemLocattion nvarchar(200),
Phone varchar(20),
ItemDscription ntext,
ItemCatagory int not null foreign key references Catagory(CatagoryID))
go

create view ShowAll
as 
SELECT TOP (100) PERCENT dbo.Items.ItemName, dbo.Items.price, dbo.Items.Phone, dbo.Items.ItemLocattion, dbo.Items.ItemDscription, dbo.Items.ItemImg, dbo.Catagory.CatagoryName
FROM dbo.Catagory INNER JOIN
dbo.Items ON dbo.Catagory.CatagoryID = dbo.Items.ItemCatagory
ORDER BY dbo.Items.ItemID DESC
go

select * from ShowAll
go



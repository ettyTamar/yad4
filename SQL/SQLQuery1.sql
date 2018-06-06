create database NirProject
on(name='NirProject_Data',
fileName='C:\NirProjectSQL\NirProject_data.mdf',
size=10,
fileGrowth=30%)
log on (name='NirProject_Data_Log',
fileName='C:\NirProjectSQL\NirProject_log.ldf',
size=10,
fileGrowth=30%)
collate hebrew_CI_AS
go


use site04
go

create table Catagory(
CatagoryID int not null identity(1,1) primary key,
CatagoryName nvarchar(100))
go


create table Users(
UserID int not null identity(1,1) primary key,
Email nvarchar(200) not null,
UPassword nvarchar(200) not null,
UName_First nvarchar(200) not null,
UName_Last nvarchar(200) not null

)

create table Items(
ItemID int not null identity(1,1) primary key,
price money,
ItemName nvarchar(50),
ItemImg nvarchar(200),
ItemLocation nvarchar(200),
Phone varchar(20),
ItemDscription nvarchar(255),
UserID int not null foreign key references Users(UserID),
ItemCatagory int not null foreign key references Catagory(CatagoryID))
go


create view Users_Items
as
SELECT dbo.Items.price, dbo.Items.ItemName, 
dbo.Items.ItemImg, dbo.Items.ItemLocation, 
dbo.Items.Phone, dbo.Items.ItemDscription, 
dbo.Catagory.CatagoryName, dbo.Users.Email, dbo.Users.UName_First, dbo.Users.UName_Last 
FROM dbo.Catagory INNER JOIN dbo.Items ON dbo.Catagory.CatagoryID = dbo.Items.ItemCatagory 
INNER JOIN dbo.Users ON dbo.Items.UserID = dbo.Users.UserID 
go

create proc User_Items(
@Email nvarchar(200)
)
as 
select * from Users_Items
WHERE(Users_Items.Email LIKE @Email)
go




create proc Register(
@Email nvarchar(200),
@Fname nvarchar(200),
@Lname nvarchar(200),
@pass nvarchar(200)
)
as
if not exists (select UserID from Users where Email = @Email)
begin
insert into Users(Email , UPassword , UName_First , UName_Last) values (@Email , @pass , @Fname , @Lname) 
end
else
select 'Email Address already taken'

go

exec Register 'yakiry@gmail.com', 'Yakir', 'Bogi', '12345'
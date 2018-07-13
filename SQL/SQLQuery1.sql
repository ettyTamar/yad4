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
SELECT site04.Items.price, site04.Items.ItemName, site04.Items.ItemID,
site04.Items.ItemImg, site04.Items.ItemLocation, 
site04.Items.Phone, site04.Items.ItemDscription, 
site04.Catagory.CatagoryName, site04.Users.Email, site04.Users.UName_First, site04.Users.UName_Last 
FROM site04.Catagory INNER JOIN site04.Items ON site04.Catagory.CatagoryID = site04.Items.ItemCatagory 
INNER JOIN site04.Users ON site04.Items.UserID = site04.Users.UserID 
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



alter proc Post(
@Email nvarchar(200),
@Catagory nvarchar(200),
@Phone nvarchar(20),
@Location nvarchar(200),
@ItemImg nvarchar(200),
@Description nvarchar(255),
@title nvarchar(50),
@Price money
)
as
declare @UserID int
declare @CatagoryID int
set @UserID = (select UserID from Users Where Email = @Email)
set @CatagoryID = (select CatagoryID from Catagory Where CatagoryName = @Catagory)
declare @ITEMID table (ItemID int)

Insert into Items(price ,ItemName,ItemImg, ItemLocation, Phone, ItemDscription ,UserID ,ItemCatagory ) 
output inserted.ItemID into @ITEMID
values(@Price, @title, @ItemImg , @Location, @Phone, @Description, @UserID, @CatagoryID)

declare @_itemid int
set @_itemid = (select top 1 ItemID from @ITEMID)
select * from Users_Items
WHERE(Users_Items.ItemID LIKE @_itemid)
go

exec Post 'orhaybenaim@gmail.com', 'ביגוד ואביזרים', '050213', 'asdsad', '' ,'', '', ''

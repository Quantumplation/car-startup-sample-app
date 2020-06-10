CREATE TABLE [dbo].[Shops]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [name] NVARCHAR(100) NOT NULL, 
    [email] NVARCHAR(80) NULL, 
    [phone] NVARCHAR(12) NULL, 
    [address] NVARCHAR(200) NOT NULL, 
    [managingUser] INT NOT NULL, 
    CONSTRAINT [Shop_Name_Unique] UNIQUE ([name]),
    CONSTRAINT [FK_ManagingUser] FOREIGN KEY ([managingUser]) REFERENCES [Users]([Id])
)

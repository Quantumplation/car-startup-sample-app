CREATE TABLE [dbo].[Sessions]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [user] int NOT NULL, 
    [token] NVARCHAR(64) NOT NULL, 
    [expiration] DATETIME NOT NULL, 
    CONSTRAINT [FK_Sessions_To_User] FOREIGN KEY ([user]) REFERENCES [Users]([Id]), 
)

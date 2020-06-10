CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [email] NVARCHAR(200) NOT NULL, 
    [passwordHash] BINARY(32) NOT NULL, 
    [passwordSalt] BINARY(8) NOT NULL, 
    [isAdmin] BIT NULL DEFAULT 0, 
    CONSTRAINT [Emails_Unique] UNIQUE ([email])
)

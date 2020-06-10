CREATE TABLE [dbo].[Incidents]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [reportingUser] INT NOT NULL, 
    [carModel] NVARCHAR(100) NOT NULL, 
    [description] NVARCHAR(2000) NULL, 
    [status] INT NOT NULL DEFAULT 1, 
    [claimingShop] INT NULL, 
    [reportedDate] DATETIME NULL, 
    CONSTRAINT [FK_reportingUser] FOREIGN KEY ([reportingUser]) REFERENCES [Users]([Id]), 
    CONSTRAINT [FK_claimingShop] FOREIGN KEY ([claimingShop]) REFERENCES [Shops]([Id])
)

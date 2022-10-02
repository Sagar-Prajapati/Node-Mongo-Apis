<!-- @format -->

# Node-Mongo-Apis

.env credentials (for testing purpose only)

**ATLAS_URI='mongodb+srv://sagar-prajapati:Sagar123@cluster0.jk1xmmb.mongodb.net/?retryWrites=true&w=majority'**\\

**JWT_SECRET=ThisISmySecret**

#### database credentials

(for testing purpose only)

link: https://cloud.mongodb.com/ \\

username: tawgao@garbagetrend.style \\

password: Sagar@123 \\

#### Git Repository Link

**https://github.com/Sagar-Prajapati/Node-Mongo-Apis**

#### hosted on heroku

**https://zerozilla-node-task.herokuapp.com/**

**APIs Created**

1-Create Agency and Client \\

POST
https://zerozilla-node-task.herokuapp.com/v1/api/create-agency \

_authorization_ : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FnYXIgdGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NDY4NTAyOH0.k78gw7d6xLz9lu-4y_y97V6KFbhpb8suVfPhEZNNQrA"

body

```json
{
	"agencyId": "agn2000",
	"name": "agency 20000",
	"address1": "dungra",
	"address2": "chanod",
	"city": "vapi",
	"state": "gujarat",
	"phoneNumber": "123456789",
	"clients": [
		{
			"clientId": "cl2",
			"name": "client 2",
			"email": "clinent2@gmail.com",
			"phoneNumber": "456789123",
			"totalBill": 4500
		},
		{
			"clientId": "cl3",
			"name": "client 3",
			"email": "clinent3@gmail.com",
			"phoneNumber": "456789123",
			"totalBill": 4500
		}
	]
}
```

2 - Update CLient \

POST
https://zerozilla-node-task.herokuapp.com/v1/api/update-client

_authorization_ : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FnYXIgdGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NDY4NTAyOH0.k78gw7d6xLz9lu-4y_y97V6KFbhpb8suVfPhEZNNQrA"

body

```json
{
	"agencyObjectId": "63384cb9ea9e67ec8ba594b2",
	"clientObjectId": "633855dab0f5e0cc9a6f2cee",
	"client": {
		"clientId": "cl2",
		"name": "client 2",
		"email": "clinent2@gmail.com",
		"phoneNumber": "456789123",
		"totalBill": 8000
	}
}
```

3 - GET detail (this api is not working properly);

https://zerozilla-node-task.herokuapp.com/v1/api/max-total-bill

_authorization_ : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FnYXIgdGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NDY4NTAyOH0.k78gw7d6xLz9lu-4y_y97V6KFbhpb8suVfPhEZNNQrA"

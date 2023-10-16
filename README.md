# xmlintojson
This js converts xml string into json object

# Instruction
1. Include/Require the xmlintojson.js file<br/>
```
var converter = require('./xmlintojson.js');
```

2. Pass the xml string to the function and save the json object response<br/>
```
var xml = "<parent><child></child></parent>";
var json = converter(xml);
```

# Output Format
Below is an example xml used to convert into json:<br/>
```
<?xml version='1.0' encoding='UTF-8'?>
<Order Id='544'>
	<orderID>81</orderID>
	<sessionID>CORRELATION-3baee8b0-b483-47aa-89b2-bf7b03d0c41f</sessionID>
	<orderlines Id='545'>
		<lineID>1</lineID>
		<productID>CFS TV</productID>
		<action>PROVIDE</action>
		<quantity>1.0</quantity>
		<requiredByDate>2011-04-30T23:50:00+05:30</requiredByDate>
		<LineUsed>false</LineUsed>
		<OrderlinesUDF Id='546'>
			<name>OrderRef</name>
			<value>OrderRefID</value>
			<flavor>input</flavor>
		</OrderlinesUDF>
	</orderlines>
	<orderlines Id='547'>
		<lineID>2</lineID>
		<productID>CFS Live Box</productID>
		<action>PROVIDE</action>
		<quantity>1.0</quantity>
		<requiredByDate>2011-04-30T23:50:00+05:30</requiredByDate>
		<LineUsed>false</LineUsed>
		<OrderlinesUDF Id='548'>
			<name>OrderRef</name>
			<value>OrderRefID</value>
			<flavor>input</flavor>
		</OrderlinesUDF>
	</orderlines>
	<orderlines Id='549'>
		<lineID>3</lineID>
		<productID>CFS VOIP</productID>
		<action>PROVIDE</action>
		<quantity>1.0</quantity>
		<requiredByDate>2011-04-30T23:50:00+05:30</requiredByDate>
		<LineUsed>false</LineUsed>
		<OrderlinesUDF Id='550'>
			<name>OrderRef</name>
			<value>OrderRefID</value>
			<flavor>input</flavor>
		</OrderlinesUDF>
	</orderlines>
	<status>NewOrder</status>
	<currentTime>2012-07-18T10:19:03+05:30</currentTime>
	<TineDelay>0</TineDelay>
	<customerref>Apple</customerref>
	<OrderHeaderUDF Id='551'>
		<name>Company</name>
		<value>Orange</value>
		<flavor>input</flavor>
	</OrderHeaderUDF>
	<Originator>Orchestrator</Originator>
	<OrderRef>OrderRefID</OrderRef>
	<businessTransactionID>a7eb1e1de1fa45c993f65589dba70648</businessTransactionID>
</Order>
```
<br/>Converted output: <br/>

```
{
    "xml": {
        "__version": "1.0",
        "__encoding": "UTF-8"
    },
    "Order": {
        "orderID": "81",
        "sessionID": "CORRELATION-3baee8b0-b483-47aa-89b2-bf7b03d0c41f",
        "orderlines": [
            {
                "lineID": "1",
                "productID": "CFS TV",
                "action": "PROVIDE",
                "quantity": "1.0",
                "requiredByDate": "2011-04-30T23:50:00+05:30",
                "LineUsed": "false",
                "OrderlinesUDF": {
                    "name": "OrderRef",
                    "value": "OrderRefID",
                    "flavor": "input",
                    "__Id": "546"
                },
                "__Id": "545"
            },
            {
                "lineID": "2",
                "productID": "CFS Live Box",
                "action": "PROVIDE",
                "quantity": "1.0",
                "requiredByDate": "2011-04-30T23:50:00+05:30",
                "LineUsed": "false",
                "OrderlinesUDF": {
                    "name": "OrderRef",
                    "value": "OrderRefID",
                    "flavor": "input",
                    "__Id": "548"
                },
                "__Id": "547"
            },
            {
                "lineID": "3",
                "productID": "CFS VOIP",
                "action": "PROVIDE",
                "quantity": "1.0",
                "requiredByDate": "2011-04-30T23:50:00+05:30",
                "LineUsed": "false",
                "OrderlinesUDF": {
                    "name": "OrderRef",
                    "value": "OrderRefID",
                    "flavor": "input",
                    "__Id": "550"
                },
                "__Id": "549"
            }
        ],
        "status": "NewOrder",
        "currentTime": "2012-07-18T10:19:03+05:30",
        "TineDelay": "0",
        "customerref": "Apple",
        "OrderHeaderUDF": {
            "name": "Company",
            "value": "Orange",
            "flavor": "input",
            "__Id": "551"
        },
        "Originator": "Orchestrator",
        "OrderRef": "OrderRefID",
        "businessTransactionID": "a7eb1e1de1fa45c993f65589dba70648",
        "__Id": "544"
    }
}
```
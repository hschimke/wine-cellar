const users = [{
    name: 'Henry'
},{
    name: 'Keisha'
}];


const wines = [
    {
        name: 'Tatinger',
        source: 'France',
        type: 'Champagne',
        bottles: [
            {
                vintage: '2018',
                bought: new Date('June 11, 2020'),
                consumed: new Date('June 15, 2020'),
                storage_location: 'Box',
                purchased_from: 'Wine.com'
            },
            {
                vintage: '2018',
                bought: new Date('June 11, 2020'),
                //consumed: new Date(),
                storage_location: 'Floor',
                purchased_from: 'HEB'
            },
            {
                vintage: '2017',
                bought: new Date('June 11, 2020'),
                consumed: new Date('Feb 2, 2021')
            },
            {
                vintage: '2016',
                bought: new Date('Jan 1 2018'),
                //consumed: new Date(''),
                storage_location: 'Ref'
            }
        ]
    },
    {
        name: 'Compte',
        source: 'France',
        type: 'Champagne',
        bottles: [
            {
                vintage: '2007',
                bought: new Date('Jan 5, 2017'),
                //consumed: new Date(),
                storage_location: 'Shower',
                purchased_from: 'Wine.com'
            },
            {
                vintage: '2007',
                bought: new Date('Jan 5, 2017'),
                consumed: new Date('April 7 2018'),
                storage_location: 'Shower',
                purchased_from: 'wine.com'
            },
            {
                vintage: '2007',
                bought: new Date('Jan 5, 2017'),
                consumed: new Date('April 7 2019'),
                storage_location: 'Shower'
            },
            {
                vintage: '2007',
                bought: new Date('June 10, 2018'),
                consumed: new Date(),
                storage_location: 'Shower'
            }
        ]
    },
    {
        name: 'Valley of the Moon',
        source: 'USA',
        type: 'Red',
        bottles: [
            {
                vintage: '2019',
                //bought: new Date(),
                //consumed: new Date(),
                storage_location: 'Box',
                purchased_from: 'HEB'
            },
            {
                vintage: '2019',
                bought: new Date('Feb 2 2021'),
                consumed: new Date('Feb 3 2021'),
                storage_location: 'Box',
                purchased_from: 'heb'
            },
            {
                vintage: '2019',
                //bought: new Date(),
                consumed: new Date('June 1 2021'),
                storage_location: '',
                purchased_from: 'gift'
            },
            {
                vintage: '2019',
                bought: new Date('Feb 11 2021'),
                //consumed: new Date(),
                //storage_location: ''
            }
        ]
    },
    {
        name: 'Sea Smoke 10',
        source: 'California',
        type: 'Red',
        bottles: [
            {
                vintage: '2016',
                bought: new Date('May 5, 2019'),
                consumed: new Date('December 5, 2019'),
                storage_location: '',
                purchased_from: 'Sea Smoke'
            },
            {
                vintage: '2016',
                bought: new Date('May 5, 2019'),
                //consumed: new Date(),
                storage_location: '',
                purchased_from: 'Sea Smoke'
            },
            {
                vintage: '2017',
                bought: new Date('May 5, 2020'),
                //consumed: new Date(),
                storage_location: '',
                purchased_from: 'Sea Smoke'
            }
        ]
    },
    {
        name: 'Hannah',
        source: 'USA',
        type: 'White',
        bottles: [
            {
                vintage: '2020',
                //bought: new Date(),
                //consumed: new Date(),
                storage_location: 'box',
                purchased_from: 'heb'
            }
        ]
    }
];

export {wines, users}
var config = {
        container: "#basic-example",
        
        connectors: {
            type: 'step'
        },
        node: {
            HTMLclass: 'nodeExample1',
        }
    },
    ceo = {
        text: {
            name: "مدیریت استان",
            id:0
        },
    },

    cto = {
        parent: ceo,
        text:{
            name: "معاونت",
            id:2
        },
        // stackChildren: true,
    },
    cbo = {
        parent: ceo,
        // stackChildren: true,
        text:{
            name: "معاونت",
            id:3
        },
    },
    cdo = {
        parent: ceo,
        text:{
            name: "John Green",
            id:4
        },
    },
    cio = {
        parent: cto,
        text:{
            name: "Ron Blomquist",
            id:5
        },
    },
    ciso = {
        parent: cto,
        text:{
            name: "Michael Rubin",
            id:6
        },
    },
    cio2 = {
        parent: cdo,
        text:{
            name: "Erica Reel",
            id:7
        },
    },
    ciso2 = {
        parent: cbo,
        text:{
            name: "Alice Lopez",
            id:8
        },
    },
    ciso3 = {
        parent: cbo,
        text:{
            name: "Mary Johnson",
            id:9
        },
    },
    ciso4 = {
        parent: cbo,
        text:{
            name: "Kirk Douglas",
            id:10
        },
        id:5
    }

    chart_config = [
        config,
        ceo,
        cto,
        cbo,
        cdo,
        cio,
        ciso,
        cio2,
        ciso2,
        ciso3,
        ciso4
    ];
    // Antoher approach, same result
    // JSON approach

/*
    var chart_config = {
        chart: {
            container: "#basic-example",
            
            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'nodeExample1'
            }
        },
        nodeStructure: {
            text: {
                name: "Mark Hill",
                title: "Chief executive officer",
                contact: "Tel: 01 213 123 134",
            },
            image: "media/2.jpg",
            children: [
                {
                    text:{
                        name: "Joe Linux",
                        title: "Chief Technology Officer",
                    },
                    stackChildren: true,
                    image: "media/1.jpg",
                    children: [
                        {
                            text:{
                                name: "Ron Blomquist",
                                title: "Chief Information Security Officer"
                            },
                            image: "media/8.jpg"
                        },
                        {
                            text:{
                                name: "Michael Rubin",
                                title: "Chief Innovation Officer",
                                contact: "we@aregreat.com"
                            },
                            image: "media/9.jpg"
                        }
                    ]
                },
                {
                    stackChildren: true,
                    text:{
                        name: "Linda May",
                        title: "Chief Business Officer",
                    },
                    image: "media/5.jpg",
                    children: [
                        {
                            text:{
                                name: "Alice Lopez",
                                title: "Chief Communications Officer"
                            },
                            image: "media/7.jpg"
                        },
                        {
                            text:{
                                name: "Mary Johnson",
                                title: "Chief Brand Officer"
                            },
                            image: "media/4.jpg"
                        },
                        {
                            text:{
                                name: "Kirk Douglas",
                                title: "Chief Business Development Officer"
                            },
                            image: "media/11.jpg"
                        }
                    ]
                },
                {
                    text:{
                        name: "John Green",
                        title: "Chief accounting officer",
                        contact: "Tel: 01 213 123 134",
                    },
                    image: "media/6.jpg",
                    children: [
                        {
                            text:{
                                name: "Erica Reel",
                                title: "Chief Customer Officer"
                            },
                            link: {
                                href: "http://www.google.com"
                            },
                            image: "media/10.jpg"
                        }
                    ]
                }
            ]
        }
    };

*/
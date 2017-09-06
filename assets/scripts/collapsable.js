
    // var chart_config = {
    //     chart: {
    //         container: "#collapsable-example",

    //         animateOnInit: true,
            
    //         node: {
    //             collapsable: true
    //         },
    //         animation: {
    //             nodeAnimation: "easeOutBounce",
    //             nodeSpeed: 700,
    //             connectorsAnimation: "bounce",
    //             connectorsSpeed: 700
    //         }
    //     },
    //     nodeStructure: {
    //         image: "img/malory.png",
    //         children: [
    //             {
    //                 image: "img/lana.png",
    //                 collapsed: true,
    //                 children: [
    //                     {
    //                         image: "img/figgs.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 image: "img/sterling.png",
    //                 childrenDropLevel: 1,
    //                 children: [
    //                     {
    //                         image: "img/woodhouse.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 pseudo: true,
    //                 children: [
    //                     {
    //                         image: "img/cheryl.png"
    //                     },
    //                     {
    //                         image: "img/pam.png"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // };

    var config = {
        container: "#collapsable-example",
        animateOnInit: true,
        
        node: {
            collapsable: true
        },
        animation: {
            nodeAnimation: "easeOutBounce",
            nodeSpeed: 700,
            connectorsAnimation: "bounce",
            connectorsSpeed: 700
        }
    },
    malory = {
        image: "img/malory.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    },

    lana = {
        parent: malory,
        image: "img/lana.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    }

    figgs = {
        parent: lana,
        image: "img/figgs.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    }

    sterling = {
        parent: malory,
        childrenDropLevel: 1,
        image: "img/sterling.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    },

    woodhouse = {
        parent: sterling,
        image: "img/woodhouse.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    },

    pseudo = {
        parent: malory,
        pseudo: false
    },

    cheryl = {
        parent: pseudo,
        image: "img/cheryl.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    },

    pam = {
        parent: pseudo,
        image: "img/pam.png",
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            id:5
        }
    },

    chart_config = [config, malory, lana, figgs, sterling, woodhouse, pseudo, pam, cheryl];


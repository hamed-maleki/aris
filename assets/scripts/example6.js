
var tree_structure = {
    chart: {
        container: "#OrganiseChart6",
        levelSeparation: 25,
        siblingSeparation: 70,
        subTeeSeparation: 70,
        nodeAlign: "BOTTOM",
        scrollbar: "fancy",
        padding: 35,
        node: { HTMLclass: "evolution-tree" },
        connectors: {
            type: "curve",
            style: {
                "stroke-width": 2,
                "stroke-linecap": "round",
                "stroke": "#ccc"
            }
        }
    },

    nodeStructure: {
        text: { name: "اولین اقدام" },
        HTMLclass: "the-parent",
        children: [
            {
                text: { name: "دومین اقدام" },
                image: "media/1.jpg"
            },
            {
                pseudo: true,
                children: [
                    {
                        text: { name: "سومین" },
                        image: "media/1.jpg",
                        children: [
                            {
                                text: { name: "هفتمین" },
                                image: "media/1.jpg"
                            },
                            {
                                text: { name: "هشتمین" },
                                image: "media/1.jpg"
                            }
                        ]
                    },
                    {
                        text: { name: "چهارمین" },
                        HTMLclass: "the-parent",
                        children: [{
                            text: { name: "چندمین" }
                        },
                        {
                            text: { name: "پنجمین" }
                        },
                        {

                            text: { name: "ششمین" },

                            children: [
                                {
                                    text: { name: "هفتمین" },
                                    image: "media/1.jpg"
                                },
                                {
                                    text: { name: "هشتمین" },
                                    image: "media/1.jpg"
                                }
                            ]

                        }
                        ]
                    }
                ]
            }, {
                text: {
                    name: "نهمین",
                    id: 5
                }
            }, {
                text: { name: "دهمین" }
            }
        ]
    }
};
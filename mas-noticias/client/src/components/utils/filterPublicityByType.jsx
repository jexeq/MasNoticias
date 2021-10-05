
export default function filterPublicityByType (publicities) {
    var pubObject = {
        smallPublicities: [],
        mediumPublicities: [],
        largePublicities: [],
        bannerPublicities: []
    };
    var smallPublicities = [];
    var mediumPublicities = [];
    var largePublicities = [];
    var bannerPublicities = [];

    publicities.forEach( p => {
        if(p.type === "small") {
            smallPublicities.push(p);
        }
        if(p.type === "medium") {
            mediumPublicities.push(p);
        }
        if(p.type === "large") {
            largePublicities.push(p);
        }
        if(p.type === "banner") {
            bannerPublicities.push(p)
        }
    });

    pubObject = {
        smallPublicities: smallPublicities,
        mediumPublicities: mediumPublicities,
        largePublicities: largePublicities,
        bannerPublicities: bannerPublicities
    };

    return pubObject;
}
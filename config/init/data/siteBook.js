module.exports = {

    import: async() => {

            try {

                // create sites
                let testSiteA = await db.Site.create({
                    tenantId: 1,
                    serviceKind: 'PR',
                    name: '科學人電子雜誌公關專屬網',
                    merchantId: '9',
                    domainName: 'a.17readbook.com',
                    privateDomainName: 'a_private.17readbook.com',
                    isAbloition: false,
                    lastUpdatedUserId: 1,
                    remark: '嗨我只是假資料'
                });
                let testSiteB = await db.Site.create({
                    tenantId: 1,
                    serviceKind: 'B2B',
                    name: '台灣知識庫電子書',
                    merchantId: '11',
                    domainName: 'b.17readbook.com',
                    privateDomainName: 'b_private.17readbook.com',
                    isAbloition: false,
                    lastUpdatedUserId: 1,
                    remark: '嗨我只是假資料'
                });
                let testSiteC = await db.Site.create({
                    tenantId: 2,
                    serviceKind: 'B2B',
                    name: '遠流員工電子書',
                    merchantId: '11',
                    domainName: 'c.17readbook.com',
                    privateDomainName: 'c_private.17readbook.com',
                    isAbloition: false,
                    lastUpdatedUserId: 1,
                    remark: '嗨我只是假資料'
                });
                console.log('site===========>', [testSiteA.id, testSiteC.id])

                // create books
                let testBook1 = await db.Book.create({
                    // id: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
                    name: '七兄弟(靜態繪本)(試讀本)',
                    cpEbookName: '七兄弟',
                    location: '/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s',
                    cover: 'a1tw-32sd-23dfs-3f24-sdff-fs3s.jpg',
                    totalPages: '32',
                    isPublish: true,
                    viewCount: 0,
                    serialName: '繪本童話中國',
                    merchantId: 50,
                    cooperativeInnerId: 'Q7001',
                    doneDate: '2009-11-02 13:47:54.047',
                    articleAuthor: '郝廣才',
                    classificationNo: '859.4',
                    listPrice: 250,
                    description: '這是流傳在山東沿海的故事...',
                    longDescription: '這是流傳在山東沿海的故事，七個有神奇能力的兄弟，因機緣救了皇帝一命，卻因而展開一連串鬥智鬥力的故事。',
                    publisher: '遠流出版事業股份有限公司',
                    EAN: '9789573211174',
                    ISBN: '9789573211174'
                });
                await testBook1.setSites([testSiteA, testSiteC]);

                let testBook2 = await db.Book.create({
                    // id: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
                    name: '七龍珠(靜態繪本)(試讀本)',
                    cpEbookName: '七龍珠',
                    location: '/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s',
                    cover: 'a1tw-32sd-23dfs-3f24-sdff-fs3s.jpg',
                    totalPages: '65',
                    isPublish: true,
                    viewCount: 0,
                    serialName: '日本漫畫',
                    merchantId: 50,
                    cooperativeInnerId: 'Q7002',
                    doneDate: '2009-11-02 13:47:54.047',
                    articleAuthor: '烏山名',
                    pictureAuthor: '烏山名',
                    classificationNo: '859.4',
                    listPrice: 125,
                    description: '很久很久以前，地球上有七顆龍珠，然後...',
                    longDescription: '地球上有七顆龍珠，每顆七龍珠分別有一至七顆星的標記。七顆龍珠並散布於世界各地，只要集齊它們便可以召喚出神龍，神龍可以滿足召喚者的一個任何願望....。',
                    publisher: '東立出版社',
                    EAN: '9789789781978',
                    ISBN: '9789789781978'
                });
                await testBook2.setSites([testSiteB.id, testSiteC.id]);

            } catch (e) {
                console.log('error=>', e.stack);
            }

        } // end
};

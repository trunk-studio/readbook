module.exports = {

    import: async() => {

            try {

                // create sites
                let testSiteA = await db.Site.create({
                    tenantId: 1,
                    serviceKind: 'PR',
                    name: '科學人電子雜誌公關專屬網',
                    merchantId: '9',
                    domainName: 'e7read.koobe.com.tw',
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
                    domainName: 'read.koobe.com.tw',
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
                    domainName: 'c.koobe.com.tw',
                    privateDomainName: 'c_private.17readbook.com',
                    isAbloition: false,
                    lastUpdatedUserId: 1,
                    remark: '嗨我只是假資料'
                });
                console.log('site===========>', [testSiteA.id, testSiteC.id])

                // create books
                let testBook1 = await db.Book.create({
                    // id: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
                    name: '兄弟(靜態繪本)(試讀本)',
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

                var roleUser = {
                    authority: 'user',
                    comment: 'site user'
                };

                let roleUserOptions = {
                    where: {
                        authority: 'user'
                    },
                    defaults: roleUser
                }
                var createRoleUser = (await db.Role.findOrCreate(roleUserOptions))[0];

                var newBuyer = {
                  username: "buyer",
                  email: "buyer@gmail.com",
                  password: "buyer",
                  RoleId: createRoleUser.id,
                  comment: "this is a newBuyer",
                  orderSyncToken:'11111',
                  mobile: '0937397377',
                  verification: true,
                  SiteId: testSiteA.id
                };
                var createNewBuyer = await db.User.create(newBuyer);

                let passport = {
                  protocol: 'local',
                  password: "buyer",
                  UserId: createNewBuyer.id
                };
                await db.Passport.create(passport);

                var newBuyerB = {
                  username: "buyerB",
                  email: "buyerB@gmail.com",
                  password: "buyerB",
                  RoleId: createRoleUser.id,
                  comment: "this is a newBuyer",
                  orderSyncToken:'11111',
                  mobile: '0937397377',
                  verification: true,
                  SiteId: testSiteB.id
                };
                var createNewBuyerB = await db.User.create(newBuyerB);

                let passportB = {
                  protocol: 'local',
                  password: "buyerB",
                  UserId: createNewBuyerB.id
                };
                await db.Passport.create(passportB);


                var roleAdmin = {
                    authority: 'admin',
                    comment: 'site admin'
                };
                let roleAdminOptions = {
                    where: {
                        authority: 'admin'
                    },
                    defaults: roleAdmin
                }
                var createRoleAdmin = (await db.Role.findOrCreate(roleAdminOptions))[0];

                let admin = {
                    username: "admin",
                    email: "admin@gmail.com",
                    mobile: "0900000000",
                    address: "admin",
                    comment: "",
                    city: "基隆市",
                    region: "仁愛區",
                    zipcode: 200,
                    RoleId: createRoleAdmin.id,
                    SiteId: testSiteB.id
                };
                let userOptions = {
                    where: {
                        username: "admin"
                    },
                    defaults: admin
                }
                let createdAdmin = (await db.User.findOrCreate(userOptions))[0];

                passport = {
                    protocol: 'local',
                    password: "admin",
                    UserId: createdAdmin.id
                };

                let passportOptions = {
                    where: {
                        UserId: createdAdmin.id
                    },
                    defaults: passport
                }

                await db.Passport.findOrCreate(passportOptions);

            } catch (e) {
                console.log('error=>', e.stack);
            }

        } // end
};

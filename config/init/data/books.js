
module.exports = {

  import: async () => {

    // create Host
    let hostApple = await db.Host.create({
      Host: 'apple',
      desc: 'a Host for apple',
      enable: true,
      weight: 1
    });
    let hostGoogle = await db.Host.create({
      Host: 'google',
      desc: 'a Host for google',
      enable: true,
      weight: 1
    });
    let hostTrunkStudio = await db.Host.create({
      Host: 'TrunkStudio',
      desc: 'a Host for TrunkStudio',
      enable: true,
      weight: 1
    });

    // create sites
    var siteApple =  await db.Site.create({
      name: 'Apple',
      avatar: '',
      type: 'OTHER',
      desc: '',
      banner: '',
      photos: []
    });
    await siteApple.setHosts(hostApple.id);
    var siteGoogle =  await db.Site.create({
      name: 'Google',
      avatar: '',
      type: 'OTHER',
      desc: '',
      banner: '',
      photos: []
    });
    await siteGoogle.setHosts(hostGoogle.id);
    var siteTrunkStudio =  await db.Site.create({
      name: 'TrunkStudio',
      avatar: '',
      type: 'OTHER',
      desc: '',
      banner: '',
      photos: []
    });
    await siteTrunkStudio.setHosts(hostTrunkStudio.id);


    // create books
    let testBook1 = await db.Book.create({
      uuid: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
      name: 'APPLE',
      desc: 'a book about apple',
      author: 'Steve Jobs',
      publishingHouse: 'nobody',
      pages: '100',
      location: '/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s',
      cover: 'a1tw-32sd-23dfs-3f24-sdff-fs3s.jpg',
      isPublish: true,
      viewCount: 999,
      SitesId:[ siteApple.id ]
    });
    await testBook1.setSites(siteApple.id,siteTrunkStudio.id);
    let testBook2 = await db.Book.create({
      uuid: 'h34v-fs3s-23dfs-fs3s-23dfs-3f24',
      name: 'Google',
      publishingHouse: 'nobody',
      desc: 'a book about google',
      author: 'eric schmidt',
      pages: '100',
      location: '/h/3/h34v-32sd-23dfs-3f24-sdff-fs3s',
      cover: 'h34v-32sd-23dfs-3f24-sdff-fs3s.jpg',
      isPublish: true,
      viewCount: 1,
      SitesId:[ siteGoogle.id ]
    });
    await testBook2.setSites(siteGoogle.id,siteTrunkStudio.id);

  } // end

};

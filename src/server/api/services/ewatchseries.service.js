import ServiceModel from './service'
import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';
import _ from 'lodash';

export default class EWatchSeriesService extends ServiceModel {
  constructor () {
    super();
    this.prefix = 'http://ewatchseries.to/'
  }

  async getPage () {
    let seriesPageResponse = await fetch(`${this.serialUrl}`)
    let seriesPage = await seriesPageResponse.text()
    this.$ = cheerio.load(seriesPage);
    return this.$;
  }

  getDetails () {
    return {
      name: this.$('.channel-title').text()
        .replace('Watch ', '').replace('Online', '')
        .replace('Comments', '').trim(),
      image: this.$('[itemprop=image]').first().attr('src')
    }
  }

  getSeasons () {
    return this.$('[itemprop="season"]').length
  }

  getEpisodes (season) {
    let episodes = []
    _.each(this.$(`#listing_${season}`).children(), element => {
      episodes.push(this.getEpisode(element))
    })
    return episodes;
  }

  getEpisode (e) {
    let element = cheerio(e);
    let meta = element.children('meta');
    let name = element.children('a').children('span[itemprop="name"]').text()
    let episode = { number: parseInt(meta[0].attribs.content), url: meta[1].attribs.content, name }
    return episode
  }
  async getSerial (id) {
    this.serialUrl = this.prefix + 'serie/' + id
    await this.getPage()
    let basic = this.getDetails()
    let seasons = this.getSeasons();
    let episodes = []

    _.each(_.range(1, seasons + 1), season => {
      episodes.push(_.orderBy(this.getEpisodes(season), ['number']))
    })

    return {
      id,
      ...basic,
      seasons,
      episodes
    };
  }
}
// const serial = new EWatchSeriesService('family_guy')
// serial.getSerial().then(console.log)

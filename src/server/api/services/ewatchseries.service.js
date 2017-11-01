import ServiceModel from './service'
import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';
import _ from 'lodash';
import request from 'request';

export default class EWatchSeriesService extends ServiceModel {
  constructor () {
    super();
    this.prefix = 'http://ewatchseries.to/'
    this.pattern = /"http(.*)(\.flv|\.mkv|\.mp4)"/;
    this.gorillaPostOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        op: 'download1',
        method_free: 'Free+Download'
      }
    };
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

  async fetchEpisodePage (serial) {
    try {
      let episodeUrl = `${this.prefix}episode/${serial.id}_s${serial.season}_e${serial.episode}.html`
      let response = await fetch(episodeUrl);
      let text = await response.text();
      return cheerio.load(text);
    } catch (e) {
      console.log(e)
      throw new Error('Unable to fetch episode page', e)
    }
  }

  extractGorillaUrl (page) {
    let encodedUrl = page('a[title="gorillavid.in"]').first().attr('href').split('=')[1]
    let url = Buffer.from(encodedUrl, 'base64').toString('ascii');
    console.log('Gorilla Url:', url)
    let options = {
      ...this.gorillaPostOptions,
      url,
      form: {
        ...this.gorillaPostOptions.form,
        id: url.split('/').pop()
      }
    }
    return new Promise((resolve, reject) => {
      try {
        request(options, (error, response, body) => {
          if (error) {
            throw new Error('Unable to find link', error)
          }
          let matches = this.pattern.exec(body)
          if (matches && matches[0]) {
            console.log('Found Download Url', matches[0])
            resolve(matches[0].replace(/"/g, ''))
          } else {
            throw new Error('Unable to find link')
          }
        });
      } catch (e) {
        reject(e)
      }
    })
  }

  async download (serial) {
    let episode = await this.fetchEpisodePage(serial);
    return this.extractGorillaUrl(episode);
  }
}
// const serial = new EWatchSeriesService()
// serial.download({id: 'family_guy', season: 1, episode: 1}).then(console.log)

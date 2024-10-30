import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnilistService {
  private readonly ANILIST_API_URL = 'https://graphql.anilist.co';

  // Phương thức gửi request đến API Anilist
  private async sendQuery(query: string, variables: any = {}) {
    try {
      const response = await axios.post(this.ANILIST_API_URL, {
        query,
        variables,
      });
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error querying AniList API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Tìm kiếm anime hoặc manga theo tên
  async searchMedia(title: string, type: 'ANIME' | 'MANGA') {
    const query = `
      query ($search: String, $type: MediaType) {
        Media(search: $search, type: $type) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
          }
          genres
        }
      }
    `;
    const variables = { search: title, type };
    return this.sendQuery(query, variables);
  }

  // Lấy thông tin chi tiết của anime hoặc manga theo ID
  async getMediaById(id: number) {
    const query = `
      query ($id: Int) {
        Media(id: $id) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
          }
          genres
          averageScore
          popularity
        }
      }
    `;
    const variables = { id };
    return this.sendQuery(query, variables);
  }

  async getMangaById(id: number) {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: MANGA) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
            medium
            color
          }
          bannerImage
          genres
          tags {
            name
            description
          }
          averageScore
          meanScore
          popularity
          favourites
          status
          chapters
          volumes
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          staff {
            edges {
              role
              node {
                id
                name {
                  full
                  native
                }
                image {
                  medium
                }
              }
            }
          }
          characters {
            edges {
              role
              node {
                id
                name {
                  full
                  native
                }
                image {
                  medium
                }
              }
            }
          }
          externalLinks {
            url
            site
          }
          siteUrl
        }
      }
    `;
    const variables = { id };
    return this.sendQuery(query, variables);
  }

  // Lấy danh sách anime/manga phổ biến nhất
  async getPopularMedia(
    type: 'ANIME' | 'MANGA',
    page: number = 1,
    perPage: number = 10,
  ) {
    const query = `
      query ($type: MediaType, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(type: $type, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            averageScore
            popularity
          }
        }
      }
    `;
    const variables = { type, page, perPage };
    const result = await this.sendQuery(query, variables);
    return result.Page.media;
  }

  // Lấy danh sách anime/manga được xếp hạng cao nhất
  async getTopRatedMedia(
    type: 'ANIME' | 'MANGA',
    page: number = 1,
    perPage: number = 10,
  ) {
    const query = `
      query ($type: MediaType, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(type: $type, sort: SCORE_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            averageScore
            popularity
          }
        }
      }
    `;
    const variables = { type, page, perPage };
    const result = await this.sendQuery(query, variables);
    return result.Page.media;
  }

  // Lấy danh sách các tập của một anime
  async getAnimeEpisodes(id: number) {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title {
            romaji
            english
          }
          episodes
          nextAiringEpisode {
            airingAt
            episode
          }
        }
      }
    `;
    const variables = { id };
    return this.sendQuery(query, variables);
  }

  // Lấy danh sách các chương của một manga
  async getMangaChapters(id: number) {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: MANGA) {
          id
          title {
            romaji
            english
          }
          chapters
        }
      }
    `;
    const variables = { id };
    return this.sendQuery(query, variables);
  }
}

import { TestBed } from '@angular/core/testing';
import { MusicFestivalService } from './music-festival.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MusicFestivalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  function setup() {
    const musicFestivalService = TestBed.get(MusicFestivalService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { musicFestivalService, httpTestingController };
  }

  it('should be created', () => {
    const { musicFestivalService } = setup();
    expect(musicFestivalService).toBeTruthy();
  });

  it('should fetch music festival data', () => {
    const { musicFestivalService, httpTestingController } = setup();
    const mockFestival = [{
      'name': 'LOL-palooza',
      'bands': [{
          'name': 'Winter Primates',
          'recordLabel': 'XS Recordings'
      }]}];
      musicFestivalService.getMusicFestivals().subscribe(res => {
      expect(res).toEqual(mockFestival);
    });

    const mockUrl = '/api/v1/festivals';
    const req = httpTestingController.expectOne(r => r.url.includes(mockUrl));

    expect(req.request.method).toBe('GET');

    req.flush(mockFestival);
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });
});


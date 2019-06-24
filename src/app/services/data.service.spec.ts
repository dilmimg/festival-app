import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  function setup() {
    const dataService = TestBed.get(DataService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { dataService, httpTestingController };
  }

  it('should be created', () => {
    const { dataService } = setup();
    expect(dataService).toBeTruthy();
  });

  it('should fetch music festival data', () => {
    const { dataService, httpTestingController } = setup();
    const mockFestival = [{
      'name': 'LOL-palooza',
      'bands': [{
          'name': 'Winter Primates',
          'recordLabel': 'XS Recordings'
      }]}];
      dataService.getMusicFestivals().subscribe(res => {
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


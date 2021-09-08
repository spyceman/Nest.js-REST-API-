import { HttpService, HttpModule} from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { JwtModule } from '@nestjs/jwt';
import { mockedJwtService } from '../utils/mocks/jwt.service';



describe('BoardsService', () => {
  let service: BoardsService;
  let httpService: HttpService;

  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
       imports: [ JwtModule.register({
        secret: 'secret',
        signOptions: {
          expiresIn: '1h'
        }
      })],
       controllers: [BoardsController],
       providers: [BoardsService, {
         provide: HttpService,
         useValue:{
           emit: HttpService
         },
       }],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getBoards', () => {
    it('should be defined', () => {
      expect(service.getBoards).toBeDefined();
    });
    it('should return object', () => {
      expect(service.getBoards('')).toEqual([]);
    });
  })

  describe('getBoard', () => {
    it('should be defined', () => {
      expect(service.getBoard).toBeDefined();
    });
    it('should return object', () => {
      expect(service.getBoard('')).toEqual('invalid id');
    });
  })

  describe('createBoard', () => {
    it('should be defined', () => {
      expect(service.createBoard).toBeDefined();
    });
    it('should return object', () => {
      expect(service.createBoard('')).toEqual('invalid key');
    });
  })

  describe('deleteBoards', () => {
    it('should be defined', () => {
      expect(service.deleteBoard).toBeDefined();
    });
    it('should return object', () => {
      expect(service.deleteBoard('')).toEqual('invalid key');
    });
  })

  describe('updateBoards', () => {
    it('should be defined', () => {
      expect(service.updateBoard).toBeDefined();
    });
    it('should return object', () => {
      expect(service.updateBoard('', {})).toEqual('invalid key');
    });
  })

  describe('search', () => {
    it('should be defined', () => {
      expect(service.search).toBeDefined();
    });
    it('should return object', () => {
      expect(service.search('')).toEqual('not logged in');
    });
  })

  describe('addMember', () => {
    it('should be defined', () => {
      expect(service.addMember).toEqual('');
    });
    it('should return object', () => {
      expect(service.addMember('', '', '')).toEqual('invalid key');
    });
  })

  describe('Service', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
});

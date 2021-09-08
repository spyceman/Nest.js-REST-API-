import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { JwtModule } from '@nestjs/jwt';



describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        secret: 'secret',
        signOptions: {
          expiresIn: '1h'
        }
      })],
      controllers: [BoardsController],
      providers: [BoardsService, {
        provide: HttpService,
        useValue:{
          emit: jest.fn
        }
      }],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of cats', async () => {
  //     const result = [{}];
  //     jest.spyOn(BoardsService, 'findAll').mockImplementation(() => result);

  //     expect(await BoardsController.findAll()).toBe(result);
  //   });
  // });
  
});

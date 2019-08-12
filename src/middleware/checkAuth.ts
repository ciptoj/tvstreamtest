import { Request, Response ,NextFunction} from 'express';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session === undefined || !req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
  }
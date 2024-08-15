export type Post = {
  id: string;
  title: string;
  content?: string;
  createdAt?: string;
  emoji?: string;
  order: number;
};

export type SnackBarMessage = { open: boolean; message: string };

type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;

type GetTodayReservation = {
  status: string;
  r_date?: string;
  r_time?: string;
};

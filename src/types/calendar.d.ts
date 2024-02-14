type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;

type GetTodayReservation = {
  status: string;
  start_date?: string;
  end_date?: string;
};

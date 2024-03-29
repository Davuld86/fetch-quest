"""new row to items table

Revision ID: 847951939e92
Revises: e09cd95123e2
Create Date: 2024-01-13 09:47:40.765016

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '847951939e92'
down_revision = 'e09cd95123e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('furn_type', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.drop_column('furn_type')

    # ### end Alembic commands ###
